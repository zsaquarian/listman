import { Request } from 'express';

export const getToken = (req: Request) => {
  return req.cookies.token;
};
