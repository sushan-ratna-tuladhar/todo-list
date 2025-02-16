import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema } from './schema/list.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'List', schema: ListSchema }])],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
