import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AbsenSantriService } from './absen-santri.service';
import {
  CreateAbsenSantriArrayDto,
  CreateAbsenSantriDto,
  FindAllAbsenSantriDto,
  UpdateAbsenSantriDto,
} from './absen-santri.dto';
import { AbsenSantri } from './absen-santri.entity';
import { Pagination } from 'src/utils/decorator/pagination-decorator';
import { JwtGuard } from '../auth/auth.guard';

@UseGuards(JwtGuard)
@Controller('absen-santri')
export class AbsenSantriController {
  constructor(private readonly absenSantriService: AbsenSantriService) {}

  @Post('test-delete-old-records')
  async testDeleteOldRecords() {
    return this.absenSantriService.removeOldRecords()
  }

  @Post('create')
  async createAbsen() {
    return this.absenSantriService.createBulk();
    // var createResult = await this.absenSantriService.createBulk();
    // var deletResult = await this.absenSantriService.removeOldRecords();

    // return { create: createResult, delete: deletResult };
  }

  @Get('list')
  async list(@Pagination() query: FindAllAbsenSantriDto) {
    return this.absenSantriService.findAll(query);
  }

  @Get('list/admin')
  async listAdmin(@Pagination() query: FindAllAbsenSantriDto) {
    return this.absenSantriService.findAllAdmin(query);
  }

  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return this.absenSantriService.findOne(Number(id));
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateAbsenSantriDto: UpdateAbsenSantriDto,
  ) {
    return this.absenSantriService.update(Number(id), updateAbsenSantriDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.absenSantriService.delete(+id);
  }
}
