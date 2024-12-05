import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { Transaction } from './entities/transaction.entity';
import { PaginationLimit } from '../auth/constants/pagination';

@Injectable()
export class TransactionService {
  getUserTransactions(user: User, page = 1) {
    return Transaction.createQueryBuilder('transaction')
      .innerJoin(
        'virtual_account',
        'virtual_account',
        'virtual_account.id = transaction.virtualAccountId',
      )
      .where('virtual_account.userId = :id', { id: user.id })
      .offset((page - 1) * PaginationLimit)
      .limit(PaginationLimit)
      .getMany();
  }
}
