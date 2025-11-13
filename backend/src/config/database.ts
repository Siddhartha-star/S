import mongoose from 'mongoose';

import { appConfig } from './index';
import { logger } from '../utils/logger';

import type { MongoMemoryServer } from 'mongodb-memory-server';

mongoose.set('strictQuery', true);

let memoryServer: MongoMemoryServer | null = null;

export const connectDatabase = async () => {
  try {
    let uri = appConfig.database.mongoUri;

    if (uri === 'memory') {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      memoryServer = await MongoMemoryServer.create();
      uri = memoryServer.getUri();
      logger.info('🧪 Using in-memory MongoDB instance');
    }

    await mongoose.connect(uri);
    logger.info('🧠 Connected to MongoDB');
  } catch (error) {
    logger.error(error, '❌ MongoDB connection failed');
    throw error;
  }
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
  logger.info('🔌 MongoDB connection closed');
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
};
