import { MyContext } from '../context';
import jwt from 'jsonwebtoken';
import { JWTToken } from './types';
import { SESSION_SECRET } from './constants';

export const isAuth = async (_source: any, _args: any, ctx: MyContext) => {
  const token = ctx.req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return false;
  }

  jwt.verify(token, SESSION_SECRET) as JWTToken;
  return true;
};
