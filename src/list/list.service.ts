import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Helpers } from 'src/app.helperfunctions';
import { readFileSync, writeFileSync } from 'fs';
import { List } from './list.entity';
import { UpdateListDto } from './dto';
import * as path from 'path';

@Injectable()
export class ListService {
  private list: Array<List>;
  private listDataFileName: string;

  constructor() {
    this.listDataFileName = path.join(__dirname, '../../data/list.data.json');
    this.list = new Helpers().sortByKey(
      JSON.parse(readFileSync(this.listDataFileName, 'utf-8')),
      'id',
    );
  }

  getList(): Array<List> {
    return new Helpers().sortByKey(this.list, 'id');
  }

  addList(newItem: List): Array<List> {
    if (this.list.find((l) => l.id == newItem.id)) {
      let error: string = `Item with id: ${newItem.id} already exists`;
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

    this.list.push(newItem);
    writeFileSync(this.listDataFileName, JSON.stringify(this.list));
    return new Helpers().sortByKey(this.list, 'id');
  }

  updateList(updateId: number, updateItem: UpdateListDto): Array<List> {
    if (!this.list.find((l) => l.id == updateId)) {
      let error: string = `Item with id: ${updateId} does not exist`;
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

    this.list.map((l) => {
      if (l.id == updateId) {
        l.title = updateItem.title || l.details;
        l.details = updateItem.details || l.details;
      }
      return l;
    });

    writeFileSync(this.listDataFileName, JSON.stringify(this.list));
    return this.list;
  }

  deleteList(id: number): Array<List> {
    const indexOfItemToBeDeleted: number = this.list.findIndex(
      (l) => l.id == id,
    );

    if(indexOfItemToBeDeleted < 1) {
      let error: string = `Item with id: ${id} does not exist`;
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

    this.list.splice(indexOfItemToBeDeleted, 1);
    writeFileSync(this.listDataFileName, JSON.stringify(this.list));
    return this.list;
  }
}
