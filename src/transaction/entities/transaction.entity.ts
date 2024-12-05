import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinTable,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { VirtualAccount } from '../../virtual-account/virtual-account.entity';
import { User } from '../../user/entities/user.entity';

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

  @ManyToOne(
    () => VirtualAccount,
    (virtualAccount) => virtualAccount.transactions,
    { onDelete: 'CASCADE' },
  )
  virtualAccount: VirtualAccount;
  virtualAccountId: number;
}
