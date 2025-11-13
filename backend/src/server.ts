import { app } from './app';
import { appConfig } from './config';
import { connectDatabase } from './config/database';
import { logger } from './utils/logger';

const bootstrap = async () => {
  try {
    await connectDatabase();

    const server = app.listen(appConfig.port, () => {
      logger.info(`🚀 API ready on port ${appConfig.port}`);
    });

    const gracefulShutdown = () => {
      logger.info('⏬ Initiating graceful shutdown');
      server.close(() => {
        logger.info('✅ Server shutdown complete');
        process.exit(0);
      });
    };

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
  } catch (error) {
    logger.error(error, '❌ Failed to start server');
    process.exit(1);
  }
};

void bootstrap();

