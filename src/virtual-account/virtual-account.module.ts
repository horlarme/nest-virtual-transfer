import { Module } from '@nestjs/common';
import { VirtualAccountService } from './virtual-account.service';
import { VirtualAccountController } from './virtual-account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VirtualAccount } from './virtual-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VirtualAccount])],
  controllers: [VirtualAccountController],
  providers: [VirtualAccountService],
})
export class VirtualAccountModule {}
