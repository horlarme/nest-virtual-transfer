import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
} from 'typeorm';
import { VirtualAccount } from '../../virtual-account/virtual-account.entity';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'bigint', default: 0, nullable: false })
  amount: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ length: 10, nullable: false })
  type: 'debit' | 'credit';

  @Column('varchar', { length: 30 })
  ref: string;

  @ManyToOne(
    () => VirtualAccount,
    (virtualAccount) => virtualAccount.transactions,
    { onDelete: 'CASCADE', eager: false },
  )
  virtualAccount: VirtualAccount;

  @Column({ nullable: false })
  virtualAccountId: number;
}
