/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../users/entities/user.entity';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
    return context.switchToHttp().getRequest().user;
};


export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => getCurrentUserByContext(context)
);
