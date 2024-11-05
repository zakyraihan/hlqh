import { OmitType } from '@nestjs/mapped-types';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { PageRequestDto } from 'src/utils/page dto/page.dto';

export class MusrifDto {
  @IsInt()
  id?: number;

  @IsString()
  nama_musrif: string;
}

export class CreateMusrifDto extends OmitType(MusrifDto, ['id']) {}

export class UpdateMusrifDto extends OmitType(MusrifDto, ['id']) {}

export class FindAllMusrif extends PageRequestDto {
  @IsString()
  @IsOptional()
  nama_musrif: string;
}
