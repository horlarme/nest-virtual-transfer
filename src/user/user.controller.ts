import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { DataSource } from 'typeorm';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private dataSource: DataSource,
  ) {}

  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
