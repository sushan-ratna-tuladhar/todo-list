import { ApiProperty } from '@nestjs/swagger';

export class UpdateListDto {
  @ApiProperty({ example: 'Buy bread', description: 'The title of your activity', required: true })
  readonly title: string;

  @ApiProperty({example: 'Go to this specific store to buy bread, preferrably brown', description: 'Details of your activity', required: false})
  readonly details: string;
}
