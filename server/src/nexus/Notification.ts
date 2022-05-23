import { extendType, objectType } from 'nexus';
import { deleteNotification, getNotifications } from '../utils/notification';
import { SubscriptionContext } from 'src/context';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/constants';

export const Notification = objectType({
  name: 'Notification',
  definition: (t) => {
    t.string('message');
    t.string('id');
  },
});

export const NotificationSubscriptions = extendType({
  type: 'Subscription',
  definition: (t) => {
    t.list.field('notifications', {
      // @ts-ignore
      type: 'Notification',
      resolve: (data) => {
        return data;
      },
      // @ts-ignore
      subscribe: async (_root, _args, ctx: SubscriptionContext, _info) => {
        const token = ctx.cookies.token;
        // @ts-ignore typescript doesn't know that the fields are in the JWT
        const jwtToken = jwt.decode(token, JWT_SECRET) as JWTToken;
        const user = await ctx.db.user.findUnique({ where: { id: jwtToken.id } });

        return (async function* () {
          if (!user) return;

          while (true) {
            const notifs = await getNotifications(ctx.redis, user);

            if (notifs.length > 0) yield notifs;

            notifs.forEach((val) => {
              deleteNotification(ctx.redis, val.id, val.user);
            });

            await new Promise((res) => setTimeout(res, 10000));
          }
        })();
      },
    });
  },
});
