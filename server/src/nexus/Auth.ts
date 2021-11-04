import { extendType, nonNull, nullable, objectType, stringArg } from 'nexus';
import { verifyToken } from '../utils/google';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import { GoogleUserInfo, JWTToken, RedisTokenInfo } from '../utils/types';
import { isPasswordValid, isUsernameValid } from '../utils/usernamePasswordReqs';
import { compare, hash } from 'bcrypt';
import { IN_PROD, JWT_EXPIRE_TIME, JWT_SECRET, REFRESH_EXPIRE_TIME, REFRESH_SECRET } from '../utils/constants';
import { isAuth } from '../utils/isAuth';
import { User } from '@prisma/client';
import { getToken } from '../utils/getToken';

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition: (t) => {
    t.nullable.field('user', {
      type: 'User',
    });
    t.nullable.string('token');
    t.nullable.string('refresh');
    t.nullable.string('error');
  },
});

export const RefreshPayload = objectType({
  name: 'RefreshPayload',
  definition: (t) => {
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
        const token = getToken(ctx.req);
        // @ts-ignore typescript doesn't know that the fields are in the JWT
        const jwtToken = jwt.decode(token, JWT_SECRET) as JWTToken;

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
            error: 'bad token',
          };
        }

        const foundUser = await ctx.db.user.findUnique({ where: { googleToken: id } });

        if (foundUser) {
          const jwtToken = jwt.sign(
            { id: foundUser.id, username: foundUser.username, googleToken: token } as JWTToken,
            JWT_SECRET,
            { expiresIn: JWT_EXPIRE_TIME }
          );
          const refresh = jwt.sign({ id: foundUser.id } as JWTToken, REFRESH_SECRET, {
            expiresIn: REFRESH_EXPIRE_TIME,
          });

          ctx.redis.get(foundUser.id.toString());

          return {
            user: foundUser,
            token: jwtToken,
            refresh,
          };
        }

        if (!username) {
          return {
            error: 'user does not exist and no username has been provided for sign up',
          };
        }

        const info = jwt.decode(token) as GoogleUserInfo;

        const user = await ctx.db.user.create({ data: { uuid: v4(), email: info.email, username, googleToken: id } });
        const jwtToken = jwt.sign(
          { id: user.id, username: user.username, googleToken: token } as JWTToken,
          JWT_SECRET,
          { expiresIn: JWT_EXPIRE_TIME }
        );
        const refresh = jwt.sign({ id: user.id } as JWTToken, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRE_TIME });

        return {
          user: foundUser,
          token: jwtToken,
          refresh,
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
            error: 'user already exists',
          };
        }

        if (!isPasswordValid(password) || !isUsernameValid(username)) {
          return {
            error: 'username or password do not comply with requirements',
          };
        }

        const hashedPassword = await hash(password, 10);

        const user = await ctx.db.user.create({ data: { username, email, uuid: v4(), password: hashedPassword } });

        const token = jwt.sign({ id: user.id, username: user.username } as JWTToken, JWT_SECRET, {
          expiresIn: JWT_EXPIRE_TIME,
        });
        const refresh = jwt.sign({ id: user.id } as JWTToken, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRE_TIME });

        await ctx.redis.set(user.id.toString(), JSON.stringify({ refresh, token, valid: true } as RedisTokenInfo));
        ctx.res.cookie('token', token, { httpOnly: true, secure: IN_PROD, sameSite: IN_PROD });

        return {
          user,
          token,
          refresh,
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
          const token = jwt.sign({ id: user.id, username: user.username } as JWTToken, JWT_SECRET, {
            expiresIn: JWT_EXPIRE_TIME,
          });
          const refresh = jwt.sign({ id: user.id } as JWTToken, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRE_TIME });

          await ctx.redis.set(user.id.toString(), JSON.stringify({ refresh, token, valid: true } as RedisTokenInfo));
          ctx.res.cookie('token', token, { httpOnly: true, secure: IN_PROD, sameSite: IN_PROD });

          return {
            user,
            token,
            refresh,
          };
        } else {
          return {
            error: 'password is wrong',
          };
        }
      },
    });
    t.field('refresh', {
      type: 'AuthPayload',
      args: {
        refresh: stringArg(),
      },
      // @ts-ignore see line 38
      authorize: isAuth,
      resolve: async (_source, { refresh }, ctx, _info) => {
        const originalToken = getToken(ctx.req);
        // @ts-ignore typescript doesn't know that the fields are in the JWT
        const user = jwt.decode(originalToken, JWT_SECRET) as JWTToken;
        const redisInfo = JSON.parse((await ctx.redis.get(user.id.toString())) || '') as RedisTokenInfo;
        console.log(redisInfo);

        if (redisInfo.refresh !== refresh || redisInfo.token !== originalToken) {
          return {
            error: 'refresh or token is invalid',
          };
        }

        const newToken = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
          expiresIn: JWT_EXPIRE_TIME,
        });
        await ctx.redis.set(
          user.id.toString(),
          JSON.stringify({ refresh, token: newToken, valid: true } as RedisTokenInfo)
        );

        return {
          token: newToken,
        };
      },
    });
  },
});
