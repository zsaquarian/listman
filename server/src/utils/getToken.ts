import { Request } from 'express';

export const getToken = (req: Request) => {
  return req.cookies.token;
};

export const getRefresh = (req: Request) => {
  return req.cookies.refresh;
};
