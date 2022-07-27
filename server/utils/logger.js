const { createLogger, transports } = require('winston');

const logger = createLogger({
  transports: [new transports.Console()],
});
// dasdfl
module.exports = logger;
