import { Request } from 'express';

export const getToken = (req: Request): string => {
  return req.cookies.token;
};

export const getRefresh = (req: Request): string => {
  return req.cookies.refresh;
};
