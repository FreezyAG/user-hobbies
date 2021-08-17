import mongoose from "mongoose";
import logger from '../utils/log';

export const createMongoDBConnection = async () => {
    try{
      return mongoose.connect(process.env.MONGODB_URI as string,
        {
          useCreateIndex: true,
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        })
    } catch (err) {
      logger.error('🚀  err at', err);
    }
}
