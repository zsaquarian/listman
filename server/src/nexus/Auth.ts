import { extendType, nonNull, nullable, objectType, stringArg } from 'nexus';
import { verifyToken } from '../utils/google';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import { GoogleUserInfo, JWTToken } from '../utils/types';
import { isPasswordValid, isUsernameValid } from '../utils/usernamePasswordReqs';
import { compare, hash } from 'bcrypt';
import { SESSION_SECRET } from '../utils/constants';
import { isAuth } from '../utils/isAuth';
import { User } from '@prisma/client';

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition: (t) => {
    t.nullable.field('user', {
      type: 'User',
    });
    t.nullable.string('token');
    t.nullable.string('error');
  },
});

export const AuthQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('me', {
      type: 'User',
      // @ts-ignore we have the field authorize plugin, but the types dont
      // recognize that
      authorize: isAuth,
      resolve: async (_source, _args, ctx, _info) => {
        const token = ctx.req.headers.authorization?.split('Bearer ')[1];

        if (!token) {
          return;
        }
        const jwtToken = jwt.verify(token, SESSION_SECRET) as JWTToken;

        const user = await ctx.db.user.findUnique({ where: { id: jwtToken.id } });
        return user;
      },
    });
  },
});

export const AuthMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('googleSignIn', {
      type: 'AuthPayload',
      args: {
        token: stringArg(),
        username: nullable(stringArg()),
      },
      resolve: async (_source, { token, username }, ctx, _info) => {
        let id;
        try {
          id = await verifyToken(token);
        } catch (e) {
          return {
            user: null,
            error: 'bad token',
          };
        }

        const foundUser = await ctx.db.user.findUnique({ where: { googleToken: id } });

        if (foundUser) {
          const jwtToken = jwt.sign(
            { id: foundUser.id, googleToken: foundUser.googleToken } as JWTToken,
            SESSION_SECRET,
            {
              expiresIn: '3d',
            }
          );

          return {
            user: foundUser,
            token: jwtToken,
            error: null,
          };
        }

        if (!username) {
          return {
            user: null,
            error: 'user does not exist and no username has been provided for sign up',
          };
        }

        const info = jwt.decode(token) as GoogleUserInfo;

        const user = await ctx.db.user.create({ data: { uuid: v4(), email: info.email, username, googleToken: id } });
        const jwtToken = jwt.sign({ id: user.id, googleToken: user.googleToken } as JWTToken, SESSION_SECRET, {
          expiresIn: '3d',
        });

        return {
          user,
          token: jwtToken,
          error: null,
        };
      },
    });
    t.field('createUser', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_source, { email, username, password }, ctx, _info) => {
        const existingUser = await ctx.db.user.findFirst({
          where: {
            OR: [
              {
                email,
              },
              {
                username,
              },
            ],
          },
        });

        if (existingUser) {
          return {
            user: null,
            error: 'user already exists',
          };
        }

        if (!isPasswordValid(password) || !isUsernameValid(username)) {
          return {
            user: null,
            error: 'username or password do not comply with requirements',
          };
        }

        const hashedPassword = await hash(password, 10);

        const user = await ctx.db.user.create({ data: { username, email, uuid: v4(), password: hashedPassword } });

        const token = jwt.sign({ id: user.id } as JWTToken, SESSION_SECRET, { expiresIn: '3d' });

        return {
          user,
          token,
          error: null,
        };
      },
    });
    t.field('login', {
      type: 'AuthPayload',
      args: {
        usernameOrEmail: stringArg(),
        password: stringArg(),
      },
      resolve: async (_source, { usernameOrEmail, password }, ctx, _info) => {
        let user: User | null;

        if (usernameOrEmail.includes('@')) {
          user = await ctx.db.user.findUnique({ where: { email: usernameOrEmail } });
        } else {
          user = await ctx.db.user.findUnique({ where: { username: usernameOrEmail } });
        }

        if (!user) {
          return {
            error: 'no such user found',
          };
        }

        if (!user.password) {
          return {
            error: 'user is signed in with oauth',
          };
        }

        const passwordCorrect = await compare(password, user.password);

        if (passwordCorrect) {
          const token = jwt.sign({ id: user.id, email: user.email } as JWTToken, SESSION_SECRET, { expiresIn: '3d' });

          return {
            user,
            token,
          };
        } else {
          return {
            error: 'password is wrong',
          };
        }
      },
    });
  },
});
