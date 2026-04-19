import { IsString, IsBoolean, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'My First Post' })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @ApiProperty({ example: 'This is the content of my first post...' })
  @IsString()
  @MinLength(10)
  content: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
