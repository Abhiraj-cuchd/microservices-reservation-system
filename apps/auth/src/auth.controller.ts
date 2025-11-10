import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './gaurds/local-auth.gaurd';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserDocument } from './users/entities/user.entity';
import { Response } from 'express';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGaurd } from './gaurds/jwt-auth.gaurd';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGaurd)
  @MessagePattern('authenticate')
  async authenticate() {}
}
