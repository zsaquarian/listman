import { MyContext } from '../context';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './constants';

export const isAuth = async (_source: any, _args: any, ctx: MyContext) => {
  const token = ctx.req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return false;
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return false;
  }
  return true;
};
