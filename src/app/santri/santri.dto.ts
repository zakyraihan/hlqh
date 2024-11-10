import { OmitType } from '@nestjs/mapped-types';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { PageRequestDto } from 'src/utils/page dto/page.dto';

export class SantriHalaqohDto {
  @IsInt()
  id?: number;

  @IsString()
  nama_santri: string;

  @IsNumber()
  @IsNotEmpty()
  musrif_id: number;

  @IsInt()
  kelas: number;

  @IsObject()
  @IsOptional()
  created_by: { id: number };

  @IsObject()
  @IsOptional()
  updated_by: { id: number };
}

export class CreateSantriHalaqohDto extends OmitType(SantriHalaqohDto, [
  'id',
]) {}
export class UpdateSantriHalaqohDto extends OmitType(SantriHalaqohDto, [
  'id',
  'created_by',
  'updated_by',
]) {}

export class findAllSantriHalaqohDto extends PageRequestDto {
  @IsString()
  @IsOptional()
  nama_santri: string;

  @IsInt()
  @IsOptional()
  musrif_id: number;
}
