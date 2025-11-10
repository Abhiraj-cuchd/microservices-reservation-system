/* eslint-disable prettier/prettier */
import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  emailId: string;

  @IsStrongPassword()
  password: string;
}
