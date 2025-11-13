import { Router } from 'express';

import { getTheme, saveTheme } from '../controllers/theme.controller';
import { authGuard } from '../middleware/authGuard';

export const themeRoutes = Router();

themeRoutes.use(authGuard);

themeRoutes.get('/', getTheme);
themeRoutes.post('/', saveTheme);

