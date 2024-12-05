import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Transaction } from '../transaction/entities/transaction.entity';

@Entity()
export class VirtualAccount extends BaseEntity {
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
  status: 'active' | 'inactive';

  /**
   * Balance of the virtual account in Kobo (the lowest denomination of Naira)
   */
  @Column({ default: 0, type: 'bigint' })
  balance: number;

  @OneToOne(() => User, (user) => user.virtualAccount, {
    eager: false,
  })
  @JoinColumn()
  user: User;

  userId: number;

  @OneToMany(() => Transaction, (transaction) => transaction.virtualAccount, {
    onDelete: 'CASCADE',
  })
  transactions: Transaction[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
