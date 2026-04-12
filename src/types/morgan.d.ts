import morgan from 'morgan';
import logger from '../utils/logger';

morgan.token('clean-url', (req) => req.originalUrl);

const stream = {
    write: (message: string) => logger.info(message.trim()),
};

export const morganMiddleware = morgan(
    ':method :clean-url :status :response-time ms',
    { stream }
);