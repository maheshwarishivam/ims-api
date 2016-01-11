/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#!/documentation/concepts/Logging
 */

/****************************************************************************
 *                                                                          *
 * Use winston to log to file.                                              *
 *                                                                          *
 ****************************************************************************/

var winston = require('winston');

var applicationLogger = new winston.Logger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/application',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      tailable: true,
      zippedArchive: true,
      maxFiles: 50,
      colorize: false,
      datePattern: '-yyyyMMdd.log'
    })
  ],
  exitOnError: false
});

module.exports.log = {

  custom: applicationLogger,

  /***************************************************************************
  *                                                                          *
  * Valid `level` configs: i.e. the minimum log level to capture with        *
  * sails.log.*()                                                            *
  *                                                                          *
  * The order of precedence for log levels from lowest to highest is:        *
  * silly, verbose, info, debug, warn, error                                 *
  *                                                                          *
  * You may also set the level to "silent" to suppress all logs.             *
  *                                                                          *
  ***************************************************************************/

    level: 'error'

};
