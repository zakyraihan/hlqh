import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsInt,
  IsEnum,
  IsArray,
  ValidateNested,
  IsObject,
  IsDate,
} from 'class-validator';
import { AbsenStatus } from './absen-santri.entity';
import { OmitType, PickType } from '@nestjs/mapped-types';
import { PageRequestDto } from 'src/utils/page dto/page.dto';
import { Type } from 'class-transformer';

export class AbsenSantri {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsNumber()
  @IsNotEmpty()
  santri: number;

  @IsNumber()
  @IsNotEmpty()
  pengampuh: number;

  @IsNotEmpty()
  @IsString()
  dariSurat: string;

  @IsNotEmpty()
  @IsString()
  sampaiSurat: string;

  @IsNumber()
  dariAyat: number;

  @IsNumber()
  sampaiAyat: number;

  @IsNotEmpty()
  @IsEnum(AbsenStatus, {
    message: `Status must be one of the following: ${Object.values(AbsenStatus).join(', ')}`,
  })
  status: AbsenStatus;

  @IsOptional()
  @IsString()
  keterangan?: string;

  @IsOptional()
  @IsString()
  created_at: string;

  @IsOptional()
  @IsString()
  updated_at: string;

  @IsObject()
  @IsOptional()
  created_by: { id: number };

  @IsObject()
  @IsOptional()
  updated_by: { id: number };
}

export class UpdateAbsenSantriDto extends OmitType(AbsenSantri, [
  'id',
  'santri',
  'pengampuh',
]) {}
export class UpdateAbsenSantriDtoAdmin extends PickType(AbsenSantri, [
  'pengampuh'
]) {}

export class CreateAbsenSantriDto extends OmitType(AbsenSantri, ['id']) {}

export class CreateAbsenSantriArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAbsenSantriDto)
  data: CreateAbsenSantriDto[];
}

export class FindAllAbsenSantriDto extends PageRequestDto {
  @IsString()
  @IsOptional()
  santri: string;

  @IsNumber()
  @IsOptional()
  kelas: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  created_at: Date; 
}
