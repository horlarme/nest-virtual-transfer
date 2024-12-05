import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './entities/user.entity';
import { VirtualAccount } from '../virtual-account/virtual-account.entity';

@Controller('user')
export class UserController {
  constructor() {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  user(@Request() req: any): User {
    return req.user as User;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: VirtualAccount })
  @Get('virtual-account')
  async getVirtualAccount(@Req() req: { user: User }): Promise<VirtualAccount> {
    return (await VirtualAccount.findOneBy({
      userId: req.user.id,
    })) as VirtualAccount;
  }
}
