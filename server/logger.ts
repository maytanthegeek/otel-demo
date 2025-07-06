import winston from 'winston';
import { OpenTelemetryTransportV3 } from '@opentelemetry/winston-transport';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new OpenTelemetryTransportV3(),
  ],
});
