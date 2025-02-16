import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Helpers } from 'src/app.helperfunctions';
import { readFileSync, writeFileSync } from 'fs';
import { List } from './list.entity';
import { UpdateListDto } from './dto';
import * as path from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ListService {
  private list: Array<List>;
  private listDataFileName: string;

  constructor(@InjectModel('List') private listModel:Model<List>) {
    // this.listDataFileName = path.join(__dirname, '../../data/list.data.json');
    // this.list = new Helpers().sortByKey(
    //   JSON.parse(readFileSync(this.listDataFileName, 'utf-8')),
    //   'sortOrder',
    // );
  }

  async addList(newListDto: List): Promise<List> {
    let existingList = await this.listModel.findOne({sortOrder: newListDto.sortOrder}).exec();
    if(existingList) {
      let error: string = `Item with sortOrder: ${existingList.sortOrder} already exists`;
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: error,
        },
        HttpStatus.CONFLICT,
        {
          cause: error,
        },
      );
    }

    newListDto.dateTimeCreated = newListDto.dateTimeCreated || new Date();

    const newList = new this.listModel(newListDto);
    return await newList.save();
  }

  async updateList(updateSortOrder: number, updateItem: UpdateListDto): Promise<List> {

    if(updateItem.status.toLowerCase() == 'done') {
      updateItem.dateTimeCompleted = updateItem.dateTimeCompleted || new Date();
    } else {
      delete updateItem.dateTimeCompleted;
    }

    let listToUpdate = await this.listModel.findOneAndUpdate({sortOrder: updateSortOrder}, updateItem, {new: true}).exec();
    if(!listToUpdate) {
      let error: string = `Item with sortOrder: ${updateSortOrder} does not exist`;
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: error,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
    return listToUpdate;
  }

  async getList(): Promise<List[]> {
    const listData = await this.listModel.find().sort({"sortOrder": 1}).exec();
    return listData;
  }

  async deleteList(sortOrder: number): Promise<List> {
      const deletedList = await this.listModel.findOneAndDelete({sortOrder: sortOrder}, {new: true}).exec();
      if (!deletedList) {
        let error: string = `Item with sortOrder: ${sortOrder} does not exist`;
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: error,
          },
          HttpStatus.NOT_FOUND,
          {
            cause: error,
          },
        );
      }
      return deletedList;
  }
}
