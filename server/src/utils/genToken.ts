import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { MyContext } from 'src/context';
import { JWT_SECRET, JWT_EXPIRE_TIME, IN_PROD, REFRESH_SECRET, REFRESH_EXPIRE_TIME } from './constants';
import { JWTToken, RedisTokenInfo } from './types';

export const genJWTToken = (user: User | JWTToken, isGoogleUser: boolean) => {
  const jwtToken = jwt.sign(
    { id: user.id, username: user.username, uuid: user.uuid, isGoogleUser } as JWTToken,
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRE_TIME,
    }
  );
  return jwtToken;
};

export const genRefreshToken = (user: User | JWTToken) => {
  const refresh = jwt.sign({ id: user.id } as JWTToken, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRE_TIME,
  });

  return refresh;
};

export const setCookie = (ctx: MyContext, jwtToken: string, refreshToken?: string) => {
  if (refreshToken) {
    ctx.res.cookie('token', jwtToken, { httpOnly: true, secure: IN_PROD });
    ctx.res.cookie('refresh', refreshToken, { httpOnly: true, secure: IN_PROD, sameSite: IN_PROD });
  } else {
    ctx.res.cookie('token', jwtToken, { httpOnly: true, secure: IN_PROD, sameSite: IN_PROD });
  }
};

export const genTokensAndSetCookie = async (
  user: User | JWTToken,
  ctx: MyContext,
  isGoogleUser: boolean,
  jwtOnly: boolean,
  refresh?: string
): Promise<{ token: string; refresh: string }> => {
  const jwtToken = genJWTToken(user, isGoogleUser);

  if (jwtOnly) {
    if (!refresh) {
      throw new Error('refresh not proided for jwtOnly');
    }

    setCookie(ctx, jwtToken);

    await ctx.redis.set(
      user.id.toString(),
      JSON.stringify({ refresh, token: jwtToken, valid: true } as RedisTokenInfo)
    );

    return {
      token: jwtToken,
      refresh: refresh,
    };
  } else {
    const refreshToken = genRefreshToken(user);
    setCookie(ctx, jwtToken, refreshToken);

    await ctx.redis.set(
      user.id.toString(),
      JSON.stringify({ refresh: refreshToken, token: jwtToken, valid: true } as RedisTokenInfo)
    );

    return {
      token: jwtToken,
      refresh: refreshToken,
    };
  }
};
