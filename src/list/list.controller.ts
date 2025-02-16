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
  async getList(): Promise<List[]> {
    return this.listService.getList();
  }

  @Post()
  @ApiOperation({ summary: 'Add a new item to your todo list'})
  @ApiResponse({ status: 201, description: 'Item added'})
  @ApiBody({ type: List, description: 'Add new item to your todo list'})
  @HttpCode(201)
  async addList(@Body() newItem: List) {
    await this.listService.addList(newItem);
    return { message: 'New item successfully added to list!' }
  }

  @Put(':sortOrder')
  @ApiOperation({ summary: 'Update existing item from your todo list'})
  @ApiBody({ type: UpdateListDto, description: 'Update existing item from your todo list'})
  @ApiParam({
    name: 'sortOrder',
    description: 'The unique sortOrder of the item in your todo list',
    type: Number,
    example: '1'
  })
  @ApiResponse({ status: 204, description: 'Item updated'})
  @HttpCode(204)
  async updateList(@Param() params, @Body() updateItem: UpdateListDto): Promise<List> {
    return await this.listService.updateList(params.sortOrder, updateItem);
  }

  @Delete(':sortOrder')
  @ApiParam({
    name: 'sortOrder',
    description: 'The unique sortOrder of the item in your todo list',
    type: Number,
    example: '1'
  })
  @ApiOperation({ summary: 'Delete existing item from your todo list'})
  @ApiResponse({ status: 204, description: 'Item deleted'})
  @HttpCode(204)
  async deleteList(@Param() params): Promise<List> {
    return await this.listService.deleteList(params.sortOrder);
  }
}
