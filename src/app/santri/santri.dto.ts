import { OmitType } from '@nestjs/mapped-types';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { PageRequestDto } from 'src/utils/page dto/page.dto';

export class SantriHalaqohDto {
  @IsInt()
  id?: number;

  @IsString()
  nama_santri: string;

  @IsInt()
  kelas: number;
}

export class CreateSantriHalaqohDto extends OmitType(SantriHalaqohDto, [
  'id',
]) {}

export class findAllSantriHalaqohDto extends PageRequestDto {
  @IsString()
  @IsOptional()
  nama_santri: string;
}
