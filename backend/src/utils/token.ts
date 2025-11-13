import { sign, verify } from 'jsonwebtoken';

import { appConfig } from '../config';

import type { SignOptions } from 'jsonwebtoken';

export interface AccessTokenPayload {
  sub: string;
  role: 'USER' | 'ADMIN';
  email: string;
}

export const generateAccessToken = (payload: AccessTokenPayload) => {
  const options = {
    expiresIn: appConfig.security.jwtExpiresIn
  } as SignOptions;

  return sign(payload, appConfig.security.jwtSecret, options);
};

export const verifyAccessToken = (token: string) => {
  return verify(token, appConfig.security.jwtSecret) as AccessTokenPayload;
};
