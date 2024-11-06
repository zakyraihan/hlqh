import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SantriHalaqohService } from './santri.service';
import { JwtGuard } from '../auth/auth.guard';
import {
  CreateSantriHalaqohDto,
  findAllSantriHalaqohDto,
  UpdateSantriHalaqohDto,
} from './santri.dto';
import { Pagination } from 'src/utils/decorator/pagination-decorator';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { query } from 'express';
import { InjectUpdatedBy } from 'src/utils/decorator/inject-updated_by.decorator';

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

  @Get('detail/:id')
  async getSantriDetail(@Param('id') id: number) {
    return this.santriService.getSantriDetail(id);
  }

  @Put('update/:id')
  async updateSantri(
    @Param('id') id: string,
    @InjectUpdatedBy() payload: UpdateSantriHalaqohDto,
  ) {
    return this.santriService.update(Number(id), payload);
  }

  @Delete('delete/:id')
  async deleteSantri(@Param('id') id: number) {
    return this.santriService.delete(+id);
  }
}
