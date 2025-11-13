import type { User } from '../../models/user.model';
import type { HydratedDocument } from 'mongoose';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
      user?: HydratedDocument<User>;
    }
  }
}

export {};

