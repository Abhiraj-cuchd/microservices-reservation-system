import { Module } from '@nestjs/common';
import { ConfigModule as NestJsConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [NestJsConfigModule.forRoot({
    validationSchema: Joi.object({
      PORT: Joi.number().default(8000),
      MONGODB_URI: Joi.string().uri().required(),
    })
  })],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
