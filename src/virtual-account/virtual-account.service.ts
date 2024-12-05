import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { VirtualAccount } from './virtual-account.entity';

@Injectable()
export class VirtualAccountService {
  async generateAccountNumber(): Promise<string> {
    let accountNumber: string;
    let isUnique = false;

    do {
      accountNumber = Math.floor(10000000 + Math.random() * 90000000)
        .toString()
        .padStart(10, '24'); // Ensure it's exactly 10 digits with leading zeros

      // Check uniqueness in the database
      const existingAccount = await VirtualAccount.existsBy({ accountNumber });

      isUnique = !existingAccount;
    } while (!isUnique);

    return accountNumber;
  }

  async createVirtualAccount(user: User): Promise<VirtualAccount> {
    const accountNumber = await this.generateAccountNumber();

    return VirtualAccount.create({
      accountNumber,
      user,
      balance: 100000000, // TODO: alway start with 0 balance?
      accountName: user.fullName,
      bankCode: '000', // TODO: Get bank code from user's bank
      bankName: 'Unknown Bank',
      status: 'active',
    });
  }

  async getVirtualAccountByAccountNumber(
    accountNumber: string,
  ): Promise<VirtualAccount | null> {
    return VirtualAccount.findOneBy({ accountNumber });
  }

  async getVirtualAccountByUserId(
    userId: number,
  ): Promise<VirtualAccount | null> {
    return VirtualAccount.findOneBy({ userId });
  }
}
