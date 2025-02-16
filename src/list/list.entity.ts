import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class List {
  @ApiProperty({ example: 1, description: 'The order of List', required: true})
  @IsNotEmpty()
  sortOrder: number;

  @ApiProperty({ example: 'Buy bread', description: 'The title of your activity', required: true })
  @IsNotEmpty()
  title: string;

  @ApiProperty({example: 'Go to this specific store to buy bread, preferrably brown', description: 'Details of your activity', required: false})
  details: string;

  @ApiProperty({example: 'To do/In progress/Done', description: 'Status of your task', required: false})
  status: string;

  @ApiProperty({example: '2025-02-16 17:06', description: 'Date time of task creation', required: false})
  dateTimeCreated: Date;

  @ApiProperty({example: '2025-02-16 19:00', description: 'Date time of task completion', required: false})
  dateTimeCompleted: Date;
}
