import { Test, TestingModule } from '@nestjs/testing';
import { ListController } from './list.controller';
import { ListService } from './list.service';

describe('ListController', () => {
  let listController: ListController;

  beforeEach(async () => {
    const list: TestingModule = await Test.createTestingModule({
      controllers: [ListController],
      providers: [ListService],
    }).compile();

    listController = list.get<ListController>(ListController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(listController.getHello()).toBe('Hello World!');
  //   });
  // });
});
