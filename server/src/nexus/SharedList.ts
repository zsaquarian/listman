import { extendType, objectType, stringArg } from 'nexus';
import { getToken } from '../utils/getToken';
import { isAuth } from '../utils/isAuth';
import { JWTToken } from '../utils/types';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/constants';
import { createNotification } from '../utils/notification';

export const SharedList = objectType({
  name: 'SharedList',
  definition: (t) => {
    t.id('id');
    t.string('listUuid');
    t.string('owner');
    t.list.string('sharedWith');
  },
});

export const SharedListMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.boolean('shareList', {
      // @ts-ignore
      authorize: isAuth,
      args: {
        listUuid: stringArg(),
        sharedWith: stringArg(),
      },
      resolve: async (_source, args, ctx, _info) => {
        const token = getToken(ctx.req);
        // @ts-ignore typescript doesn't know that the fields are in the JWT
        const user = jwt.decode(token, JWT_SECRET) as JWTToken;
        const { listUuid, sharedWith } = args;
        const sharedWithUser = await ctx.db.user.findUnique({ where: { username: sharedWith } });

        if (!sharedWithUser) {
          throw new Error('user with that username does not exist');
        }

        await ctx.db.sharedList.create({ data: { listUuid, owner: user.uuid, sharedWith: [sharedWithUser.uuid] } });
        await createNotification(ctx.redis, `${user.username} has shared a list with you`, sharedWithUser);
        return true;
      },
    });
  },
});

export const SharedListQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.string('getSharedLists', {
      // @ts-ignore
      authorize: isAuth,
      resolve: async (_source, _args, ctx, _info) => {
        const token = getToken(ctx.req);
        // @ts-ignore typescript doesn't know that the fields are in the JWT
        const user = jwt.decode(token, JWT_SECRET) as JWTToken;

        if (user) {
          const results = await ctx.db.sharedList.findMany({
            where: { OR: [{ sharedWith: { has: user.uuid } }, { owner: user.uuid }] },
          });
          return results.map((val) => val.listUuid);
        }

        return [];
      },
    });

    t.boolean('canViewList', {
      args: {
        uuid: stringArg(),
      },
      // @ts-ignore
      authorize: isAuth,
      resolve: async (_source, args, ctx, _info) => {
        const { uuid } = args;

        const list = await ctx.db.sharedList.findUnique({ where: { listUuid: uuid } });

        if (!list) {
          throw new Error('list does not exist');
        }

        const token = getToken(ctx.req);
        // @ts-ignore typescript doesn't know that the fields are in the JWT
        const user = jwt.decode(token, JWT_SECRET) as JWTToken;

        if (list.owner === user.uuid || list.sharedWith.includes(user.uuid)) {
          return true;
        }

        return false;
      },
    });
  },
});
