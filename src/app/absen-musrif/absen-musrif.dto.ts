import { OmitType } from '@nestjs/mapped-types';
import {
  isBoolean,
  IsBooleanString,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../auth/auth.entity';
import { PageRequestDto } from 'src/utils/page dto/page.dto';

export class absenMusrifDto {
  @IsInt()
  id?: number;

  @IsString()
  nama: string;

  @IsBooleanString()
  hadir: boolean;

  @IsDate()
  tanggal_masuk: Date;
}

export class findAllAbsenMusrifDto extends PageRequestDto {
  @IsString()
  @IsOptional()
  nama: string;
}

export class CreateAbsenMusrifMasukDto extends OmitType(absenMusrifDto, [
  'id',
  'hadir',
  'tanggal_masuk',
]) {}
export class CreateAbsenKeluarDto {
  @IsInt()
  id: number;
}
