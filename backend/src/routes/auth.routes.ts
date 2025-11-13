import { Router } from 'express';

import { login, logout, me, signup } from '../controllers/auth.controller';
import { authGuard } from '../middleware/authGuard';

export const authRoutes = Router();

authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/me', authGuard, me);
authRoutes.post('/logout', authGuard, logout);

