import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorlogger, logger } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('🔥__Database Connected')

    app.listen(config.port, () => {
      logger.info(`APPLICATION RUNNING ON PORT ${config.port}`)
    })
  } catch (error) {
    errorlogger.error(error)
  }
}

bootstrap()
