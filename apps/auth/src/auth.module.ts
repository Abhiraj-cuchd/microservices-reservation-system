import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { LoggerModule } from '@app/shared';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    LoggerModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        PORT: Joi.number().default(5002),
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        const expiresInRaw = configService.get<string>('JWT_EXPIRATION')!;
        const expiresIn = /^(\d+)$/.test(expiresInRaw)
          ? Number(expiresInRaw)
          : expiresInRaw;

        return {
          secret: configService.get<string>('JWT_SECRET')!,
          signOptions: {
            expiresIn: expiresIn as number,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
