/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AbsenMusrifService } from './absen-musrif.service';
import { AbsensiMusrif } from './absen-musrif.entity';
import { JwtGuard } from '../auth/auth.guard';
import { ResponsePagination } from 'src/interface/response';

import {
  CreateAbsenMusrifMasukDto,
  CreateAbsenKeluarDto,
  findAllAbsenMusrifDto,
} from './absen-musrif.dto';
import { Pagination } from 'src/utils/decorator/pagination-decorator';

@UseGuards(JwtGuard)
@Controller('absensi-musrif')
export class AbsenMusrifController {
  constructor(private readonly absenMusrifService: AbsenMusrifService) {}

  @Post('masuk')
  async absenMasuk() {
    return this.absenMusrifService.absenMasuk();
  }

  @Get('getAll')
  async get() {
    return this.absenMusrifService.findAllAbsensi();
  }

  @Post('keluar')
  async absenKeluar(@Body() createAbsenKeluarDto: CreateAbsenKeluarDto) {
    return this.absenMusrifService.absenKeluar(createAbsenKeluarDto);
  }

  // @Get('list')
  // async listAbsenMusrif(@Pagination() query: findAllAbsenMusrifDto) {
  //   return this.absenMusrifService.getAllAbsen(query);
  // }
}
