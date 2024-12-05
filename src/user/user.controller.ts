import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor() {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  user(@Request() req: any): User {
    return req.user;
  }
}
