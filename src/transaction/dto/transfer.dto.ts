import { Length, Min } from 'class-validator';

export class Transfer {
  @Length(10, 10, { message: 'Virtual account number should be 10 digits' })
  to: string;
  @Min(10, { message: 'Amount should be more than 10' })
  amount: number;
}
