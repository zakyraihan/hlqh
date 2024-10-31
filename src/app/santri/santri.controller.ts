import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { SantriHalaqohService } from './santri.service';
import { JwtGuard } from '../auth/auth.guard';
import { CreateSantriHalaqohDto, findAllSantriHalaqohDto } from './santri.dto';
import { Pagination } from 'src/utils/decorator/pagination-decorator';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { query } from 'express';

@UseGuards(JwtGuard)
@Controller('santri-halaqoh')
export class SantriHalaqohController {
  constructor(private readonly santriService: SantriHalaqohService) {}

  @Post('create')
  async create(@Body() payload: CreateSantriHalaqohDto) {
    return this.santriService.create(payload);
  }

  @Get('list')
  async getAllSantri(@Pagination() query: findAllSantriHalaqohDto) {
    return this.santriService.getAllSantri(query);
  }
}
