import { hash } from 'bcryptjs';

import { appConfig } from '../config';
import { connectDatabase, disconnectDatabase } from '../config/database';
import { ThemePreferenceModel, UserModel } from '../models';
import { logger } from '../utils/logger';
import { defaultTheme } from '../utils/theme';

const demoUsers = [
  {
    email: 'admin@example.com',
    password: 'password123',
    fullName: 'Ava Stone',
    role: 'ADMIN' as const,
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=ava'
  },
  {
    email: 'user@example.com',
    password: 'password123',
    fullName: 'Liam Turner',
    role: 'USER' as const,
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=liam'
  }
];

const seed = async () => {
  await connectDatabase();

  for (const user of demoUsers) {
    const passwordHash = await hash(user.password, 12);

    const createdUser = await UserModel.findOneAndUpdate(
      { email: user.email },
      {
        fullName: user.fullName,
        passwordHash,
        role: user.role,
        avatarUrl: user.avatarUrl
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await ThemePreferenceModel.findOneAndUpdate(
      { user: createdUser._id },
      {
        $setOnInsert: {
          accent: appConfig.theming.defaultAccent,
          highlight: appConfig.theming.defaultHighlight,
          base: defaultTheme.base,
          surface: defaultTheme.surface,
          glow: defaultTheme.glow,
          mode: defaultTheme.mode
        }
      },
      { upsert: true }
    );
  }

  logger.info('✅ Seed data applied successfully');
  await disconnectDatabase();
};

seed().catch((error) => {
  logger.error(error, '❌ Failed to seed database');
  disconnectDatabase().finally(() => process.exit(1));
});

