import { Router } from 'express';

import { createItem, deleteItem, listItems, updateItem } from '../controllers/item.controller';
import { authGuard } from '../middleware/authGuard';

export const itemRoutes = Router();

itemRoutes.use(authGuard);

itemRoutes.get('/', listItems);
itemRoutes.post('/', createItem);
itemRoutes.patch('/:id', updateItem);
itemRoutes.delete('/:id', deleteItem);

