import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { Transaction } from './entities/transaction.entity';
import { PaginationLimit } from '../auth/constants/pagination';
import { Transfer } from './dto/transfer.dto';
import { VirtualAccountService } from '../virtual-account/virtual-account.service';
import { DataSource } from 'typeorm';
import { VirtualAccount } from '../virtual-account/virtual-account.entity';

@Injectable()
export class TransactionService {
  constructor(
    private virtualAccountService: VirtualAccountService,
    private dataSource: DataSource,
  ) {}

  async generateReferenceNumber(): Promise<string> {
    let referenceNumber: string;
    let isUnique = false;

    do {
      const timestamp = Date.now().toString();
      const randomString = Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();
      referenceNumber = `LD-${timestamp}-${randomString}`;
      const existingAccount = await Transaction.existsBy({
        ref: referenceNumber,
      });

      isUnique = !existingAccount;
    } while (!isUnique);

    return referenceNumber;
  }

  getUserTransactions(user: User, page = 1, search: string = '') {
    return Transaction.createQueryBuilder('transaction')
      .innerJoin(
        'virtual_account',
        'virtual_account',
        'virtual_account.id = transaction.virtualAccountId',
      )
      .where('virtual_account.userId = :id', { id: user.id })
      .andWhere(
        '(transaction.ref like :query or transaction.description like :query)',
        {
          query: `%${search}%`,
        },
      )
      .orderBy('transaction.createdAt', 'DESC')
      .take(PaginationLimit)
      .skip((page - 1) * PaginationLimit)
      .getMany();
  }

  async makeTransfer(user: User, body: Transfer) {
    const recipient =
      await this.virtualAccountService.getVirtualAccountByAccountNumber(
        body.to,
      );

    if (recipient) {
      const sender =
        (await this.virtualAccountService.getVirtualAccountByUserId(user!.id))!;

      const ref = await this.generateReferenceNumber();

      return await this.dataSource.transaction(async (manager) => {
        // todo: check if user has enough balance
        const debitTransaction = Transaction.create({
          type: 'debit',
          ref,
          amount: body.amount,
          description: `Transfer to ${recipient.accountNumber}`,
          virtualAccountId: sender.id,
        });

        const creditTransaction = Transaction.create({
          ref,
          type: 'credit',
          amount: body.amount,
          description: `Transfer from ${sender.accountNumber}`,
          virtualAccountId: recipient.id,
        });

        sender.balance = +sender.balance - body.amount;
        recipient.balance = +recipient.balance + body.amount;

        await manager.save([
          debitTransaction,
          creditTransaction,
          sender,
          recipient,
        ]);

        return debitTransaction;
      });
    }

    throw new BadRequestException('Invalid Virtual Account Number');
  }
}
