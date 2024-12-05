import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiBearerAuth, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Transaction } from './entities/transaction.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/entities/user.entity';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ type: Transaction, isArray: true })
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'page', required: false, default: 1, type: Number })
  @Get()
  async getTransactions(
    @Req() request: { user: User },
    @Query('page') page?: number,
  ): Promise<Transaction[]> {
    return this.transactionService.getUserTransactions(request.user, page || 1);
  }
}
