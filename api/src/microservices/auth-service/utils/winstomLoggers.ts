import winston from 'winston';

const logFormat = winston.format.combine(
    winston.format.colorize(), // This adds colorization to the console output
    winston.format.simple() // You can use any other format you prefer
)

// ! infoLogger.info("User Requested /register portal");
const infoLogger = winston.createLogger({
    level: 'info',
    // format: winston.format.simple(),
    format: logFormat,
    transports: [
        new winston.transports.Console(), // Log to the console
        // new winston.transports.File({ filename: 'winston.log' }) // write in log file
    ]
});

export default infoLogger;
