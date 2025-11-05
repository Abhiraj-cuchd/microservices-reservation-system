import { Module } from '@nestjs/common';
import { LoggerModule as PinoLogger } from 'nestjs-pino';

@Module({
  imports: [
    PinoLogger.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            singleLine: true,
            ignore: 'pid, hostname',
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
