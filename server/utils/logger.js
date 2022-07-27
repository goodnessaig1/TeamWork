const { createLogger, format, transports, config } = require('winston');

const usersLogger = createLogger({
  levels: config.syslog.levels,
  transports: [new transports.File({ filename: 'users.log' })],
});
const transactionLogger = createLogger({
  transports: [new transports.File({ filename: 'transaction.log' })],
});

module.exports = {
  usersLogger: usersLogger,
  transactionLogger: transactionLogger,
};
