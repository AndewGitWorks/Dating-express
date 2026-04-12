import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logDir = path.join(__dirname, '../../logs');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Красивый формат для консоли
const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
        format: 'DD-MM-YYYY HH:mm:ss',
    }),
    winston.format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] ${level}: ${message}`;
    })
);

// ТАКОЙ ЖЕ красивый формат для файла (убираем JSON)
const fileFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'DD-MM-YYYY HH:mm:ss',
    }),
    winston.format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
);

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: consoleFormat,
        }),
        new winston.transports.File({
            filename: path.join(logDir, 'combined.log'),
            format: fileFormat,
        }),
        new winston.transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error',
            format: fileFormat,
        }),
    ],
});

export default logger;