import { ApiProperty } from '@nestjs/swagger';

export class UpdateListDto {
  @ApiProperty({ example: 'Buy bread', description: 'The title of your activity', required: true })
  readonly title: string;

  @ApiProperty({example: 'Go to this specific store to buy bread, preferrably brown', description: 'Details of your activity', required: false})
  readonly details: string;

  @ApiProperty({example: 'To do/In progress/Done', description: 'Status of your activity', required: false})
  readonly status: string;

  @ApiProperty({example: '2025-02-16 19:04', description: 'Date time when your activity is completed', required: false})
  dateTimeCompleted: Date;
}
