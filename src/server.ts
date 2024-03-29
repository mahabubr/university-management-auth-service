import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import subscribeToEvents from './app/events';
import config from './config/index';
import { errorlogger, logger } from './shared/logger';
import { RedisClient } from './shared/redis';

let server: Server;

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});

async function bootstrap() {
  try {
    await RedisClient.connect().then(() => {
      subscribeToEvents();
    });

    await mongoose.connect(config.database_url as string);
    logger.info('🔥__Database Connected');

    server = app.listen(config.port, () => {
      logger.info(`APPLICATION RUNNING ON PORT ${config.port}`);
    });
  } catch (error) {
    errorlogger.error(error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
