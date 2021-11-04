import { MyContext } from '../context';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './constants';
import { getToken } from './getToken';

export const isAuth = async (_source: any, _args: any, ctx: MyContext) => {
  const token = getToken(ctx.req);

  if (!token) {
    return false;
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};
