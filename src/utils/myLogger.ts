// logger.ts

import winston from 'winston'; // Import for type safety

const consoleTransport = new winston.transports.Console();

// Define custom format function (optional)
const myFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
  winston.format.colorize({ all: true }), // Add color (optional)
  winston.format.printf((info) => `${info.level}: ${info.message}`) // Customize message format
);

const myWinstonOptions = {
  transports: [consoleTransport],
  format: myFormat, // Apply the custom format (optional)
};

const logger = winston.createLogger(myWinstonOptions);

export default logger;
