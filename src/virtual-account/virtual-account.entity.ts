import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Transaction } from '../transaction/entities/transaction.entity';

@Entity()
export class VirtualAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  accountNumber: string;

  @Column()
  accountName: string;

  @Column()
  bankCode: string;

  @Column()
  bankName: string;

  @Column()
  status: string;

  @Column({ default: 0, type: 'bigint' })
  balance: number;

  @ManyToOne(() => User, (user) => user.virtualAccounts, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.virtualAccount, {
    onDelete: 'CASCADE',
  })
  transactions: Transaction[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
