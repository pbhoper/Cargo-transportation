import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsController } from './report/report.controller';
import { EmailController } from './email/email.controller';
import { AuthController } from './auth/auth.controller';
import { TthController } from './ttn/tth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TthModule } from './ttn/tth.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { AuthModule } from './auth/auth.module';
import { ReportModule } from './report/report.module';
import { MailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { WriteOffModule } from './writeoff/writeoff.module';
import { WaybillModule } from './waybill/waybill.module';
import { UsersModule } from './users/users.module';
import { GoodsModule } from './goods/goods.module';

@Module({
  controllers: [
    AppController,
    ReportsController,
    EmailController,
    AuthController,
    TthController,
  ],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT!, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'poiuytrewq123.com',
      database: process.env.DB_DATABASE || 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    TthModule,
    WarehousesModule,
    AuthModule,
    ReportModule,
    MailModule,
    WriteOffModule,
    WaybillModule,
    UsersModule,
    GoodsModule,
  ],
})
export class AppModule {}