import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_CLIENT_ID_ANDROID, GOOGLE_CLIENT_ID_WEB } from './constants';

export const oAuthClient = new OAuth2Client(GOOGLE_CLIENT_ID_WEB);

export const verifyToken = async (token: string): Promise<string> => {
  const ticket = await oAuthClient.verifyIdToken({
    idToken: token,
    audience: [GOOGLE_CLIENT_ID_WEB, GOOGLE_CLIENT_ID_ANDROID],
  });

  const payload = ticket.getPayload();
  if (!payload) {
    throw new Error('payload is undefined');
  }
  const user = payload.sub;
  return user;
};
