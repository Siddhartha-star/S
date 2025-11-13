import { appConfig } from '../config';

import type { CookieOptions, Response } from 'express';

export const authCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: appConfig.cookie.secure,
  sameSite: 'lax',
  domain: appConfig.cookie.domain,
  path: '/',
  maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
};

export const setAuthCookie = (response: Response, token: string) => {
  response.cookie(appConfig.cookie.name, token, authCookieOptions);
};

export const clearAuthCookie = (response: Response) => {
  response.clearCookie(appConfig.cookie.name, {
    ...authCookieOptions,
    maxAge: 0
  });
};

