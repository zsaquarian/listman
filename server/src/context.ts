import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { WrappedNodeRedisClient } from 'handy-redis';

export interface MyContext {
  db: PrismaClient;
  req: Request;
  res: Response;
  redis: WrappedNodeRedisClient;
}

export interface SubscriptionContext {
  redis: WrappedNodeRedisClient;
  cookies: Record<string, string>;
  db: PrismaClient;
}
