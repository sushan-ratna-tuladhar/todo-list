import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class List {
  @ApiProperty({ example: 1, description: 'The id or order of List', required: true})
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'Buy bread', description: 'The title of your activity', required: true })
  @IsNotEmpty()
  title: string;

  @ApiProperty({example: 'Go to this specific store to buy bread, preferrably brown', description: 'Details of your activity', required: false})
  details: string;
}
