/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import {createLogger, format, transports} from 'winston';

class LoggerService {
  
  static myLogger = createLogger({
    format: format.combine(
      format.colorize(),
      format.json()
    ),
    transports: [
      (process.env.NODE_ENV === 'production') ?
        new transports.Console() :
        new transports.Console({
          format: format.simple()
        }),
      new transports.File({ filename: 'error.log', level: 'error' }),
    ],
  });

  static error(msg, error) {
    console.log('\r');
    LoggerService.myLogger.error({
      timeStamp: new Date().toLocaleString(),
      message: msg,
      error
    })
  }

  static info(msg, info = null) {
    console.log('\r');
    LoggerService.myLogger.info({
      timeStamp: new Date().toLocaleString(),
      message: msg,
      data: info || ''
    })
  }
}

export default LoggerService;