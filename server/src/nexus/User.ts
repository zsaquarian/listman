import { objectType } from 'nexus';
import { MyContext } from '../context';

export const User = objectType({
  name: 'User',
  definition: (t) => {
    t.nonNull.int('id');
    t.nonNull.string('username');
    t.nonNull.string('email', {
      resolve: (root, _args, _ctx, _info) => root.email,
      // @ts-ignore
      authorize: (root, args, ctx: MyContext): boolean => {
        const jwtToken = ctx.req.headers['authorization'];

        return !!jwtToken;
      },
    });
    t.nonNull.string('uuid');
  },
});
