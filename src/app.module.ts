import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { VirtualAccountModule } from './virtual-account/virtual-account.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        logging: true,
        type: configService.get('DATABASE_TYPE') as 'postgres',
        host: configService.get('DATABASE_HOST', ''),
        port: +configService.get('DATABASE_PORT', 3306),
        username: configService.get('DATABASE_USER', 'root'),
        password: configService.get('DATABASE_PASS', 'root'),
        database: configService.get('DATABASE_DATABASE', 'app') as string,
        models: [],
        // entities: [User, VirtualAccount, Transaction],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    TransactionModule,
    AuthModule,
    VirtualAccountModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
