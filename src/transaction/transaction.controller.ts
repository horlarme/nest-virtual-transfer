import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { Transaction } from './entities/transaction.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/entities/user.entity';
import { Transfer } from './dto/transfer.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: Transaction,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'page', required: false, default: 1, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search by transaction reference or description',
  })
  @Get()
  async getTransactions(
    @Req() request: { user: User },
    @Query('search') search?: string,
    @Query('page') page?: number,
  ): Promise<Transaction[]> {
    return this.transactionService.getUserTransactions(
      request.user,
      page || 1,
      search,
    );
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Transaction })
  @UseGuards(JwtAuthGuard)
  @Post()
  async transfer(@Body() body: Transfer, @Req() request: { user: User }) {
    return this.transactionService.makeTransfer(request.user, body);
  }
}
