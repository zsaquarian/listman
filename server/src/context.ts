import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

export interface MyContext {
  db: PrismaClient;
  req: Request;
  res: Response;
}
