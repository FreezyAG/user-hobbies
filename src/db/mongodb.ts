import mongoose from "mongoose";
import logger from '../utils/log';

export const createMongoDBConnection = async () => {
    try{
      return mongoose.connect(
        `mongodb://user:pass@${process.env.MONGO_ADDRESS}:27017/admin`,
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
