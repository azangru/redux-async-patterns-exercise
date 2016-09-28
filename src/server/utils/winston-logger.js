// Logging utility
import winston from 'winston';
import path from 'path';

let winstonLogger = new winston.Logger({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: path.join(__dirname, '../../../logs/errors.log')})
    ]
  });
process.on('uncaughtException', (err) => {
    winstonLogger.error(`UNHANDLED EXCEPTION! ${err}`);
});

export default winstonLogger;
