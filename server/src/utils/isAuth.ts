import { MyContext } from '../context';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './constants';
import { getToken } from './getToken';
import { JWTToken, RedisTokenInfo } from './types';

export const isAuth = async (_source: any, _args: any, ctx: MyContext) => {
  const token = getToken(ctx.req);

  if (!token) {
    return false;
  }

  try {
    let user = jwt.verify(token, JWT_SECRET) as JWTToken;
    const redisInfo = JSON.parse((await ctx.redis.get(user.id.toString())) || '') as RedisTokenInfo;

    if (!redisInfo.valid) {
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }

  return true;
};
