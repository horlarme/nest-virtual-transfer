import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  BaseEntity,
} from 'typeorm';
import { VirtualAccount } from '../../virtual-account/virtual-account.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => VirtualAccount, (a) => a.user)
  virtualAccount: VirtualAccount;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
