import { Module } from '@nestjs/common';
import { ListModule } from './list/list.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ['.env']}),
    ListModule,
    MongooseModule.forRoot(process.env.DB_CONNECTION, {dbName: process.env.DB_NAME})
  ]
})
export class AppModule {}
