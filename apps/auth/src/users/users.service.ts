import {
  Injectable,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  private readonly logger = new Logger(UsersService.name);

  async createUser(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);
    return await this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOne({ emailId: createUserDto.emailId });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return;
    }
    throw new UnprocessableEntityException(
      'User with given email already exists',
    );
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ emailId: email });
    this.logger.log(`Fetched user: ${JSON.stringify(user)}`);

    if (!user) {
      this.logger.warn(`User not found for email: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return await this.usersRepository.findOne({ _id: getUserDto._id });
  }
}
