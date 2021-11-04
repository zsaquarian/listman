import { objectType } from 'nexus';
import { getToken } from '../utils/getToken';
import { MyContext } from '../context';

export const User = objectType({
  name: 'User',
  definition: (t) => {
    t.nonNull.int('id');
    t.nonNull.string('username');
    t.nonNull.string('email', {
      resolve: (root, _args, _ctx, _info) => root.email,
      // @ts-ignore
      authorize: (_root, _args, ctx: MyContext): boolean => {
        const jwtToken = getToken(ctx.req);

        return !!jwtToken;
      },
    });
    t.nonNull.string('uuid');
  },
});
