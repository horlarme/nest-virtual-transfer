import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { VirtualAccount } from '../../virtual-account/virtual-account.entity';

@Entity()
export class Transaction {
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

  // @ManyToOne(() => User, (user) => user.transactions)
  // @JoinTable({
  //   name: 'virtual_account',
  //   joinColumn: {
  //     name: 'virtual_account_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'user_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // user: User;
}
