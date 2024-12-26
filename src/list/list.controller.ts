import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode
} from '@nestjs/common';
import { ListService } from './list.service';
import { UpdateListDto } from './dto';
import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { List } from './list.entity';

@ApiTags('list')
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  @ApiOperation({ summary: 'Get your todo list'})
  @ApiResponse({ status: 200, description: 'Todo list of your items', type: List})
  @HttpCode(200)
  getList(): Array<List> {
    return this.listService.getList();
  }

  @Post()
  @ApiOperation({ summary: 'Add a new item to your todo list'})
  @ApiResponse({ status: 201, description: 'Item added'})
  @ApiBody({ type: List, description: 'Add new item to your todo list'})
  @HttpCode(201)
  addList(@Body() newItem: List) {
    this.listService.addList(newItem);
    return { message: 'New item successfully added to list!' }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update existing item from your todo list'})
  @ApiBody({ type: UpdateListDto, description: 'Update existing item from your todo list'})
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the item in your todo list',
    type: Number,
    example: '1'
  })
  @ApiResponse({ status: 204, description: 'Item updated'})
  @HttpCode(204)
  updateList(@Param() params, @Body() updateItem: UpdateListDto): Array<List> {
    return this.listService.updateList(params.id, updateItem);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the item in your todo list',
    type: Number,
    example: '1'
  })
  @ApiOperation({ summary: 'Delete existing item from your todo list'})
  @ApiResponse({ status: 204, description: 'Item deleted'})
  @HttpCode(204)
  deleteList(@Param() params): Array<List> {
    return this.listService.deleteList(params.id);
  }
}
