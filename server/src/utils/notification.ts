import { User } from '@prisma/client';
import { WrappedNodeRedisClient } from 'handy-redis';
import { v4 } from 'uuid';

export interface Notification {
  message: string;
  user: string; // uuid
  id: string;
}

export const createNotification = async (redis: WrappedNodeRedisClient, message: string, user: User | string) => {
  const uuid = typeof user === 'string' ? user : user.uuid;
  const notif = { message, user: uuid, id: v4() } as Notification;
  const key = `user-${uuid}`;

  if ((await redis.exists(key)) && (await redis.get(key)).length > 0) {
    await redis.append(key, ';' + JSON.stringify(notif));
  } else {
    await redis.append(key, JSON.stringify(notif));
  }

  return notif;
};

export const deleteNotification = async (redis: WrappedNodeRedisClient, id: string, user: User | string) => {
  const uuid = typeof user === 'string' ? user : user.uuid;
  let notifs = (await redis.get(`user-${uuid}`))?.split(';').map((val) => JSON.parse(val) as Notification);

  if (!notifs) return;

  notifs = notifs.filter((val) => val.id !== id);

  await redis.set(`user-${uuid}`, notifs.map((val) => JSON.stringify(val)).join(','));
};

export const getNotifications = async (redis: WrappedNodeRedisClient, user: User | string) => {
  const uuid = typeof user === 'string' ? user : user.uuid;
  const notifs = (await redis.get(`user-${uuid}`))?.split(';').map((val) => JSON.parse(val) as Notification);

  return notifs || [];
};
