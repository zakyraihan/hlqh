import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MusrifService } from './musrif.service';
import { CreateMusrifDto, FindAllMusrif, UpdateMusrifDto } from './musrif.dto';
import { Pagination } from 'src/utils/decorator/pagination-decorator';
import { JwtGuard } from '../auth/auth.guard';
import { InjectUpdatedBy } from 'src/utils/decorator/inject-updated_by.decorator';

@UseGuards(JwtGuard)
@Controller('musrif')
export class MusrifController {
  constructor(private readonly musrifService: MusrifService) {}

  @Post('create')
  async createMusrif(@Body() payload: CreateMusrifDto) {
    return this.musrifService.create(payload);
  }

  @Get('list')
  async listMusrif(@Pagination() query: FindAllMusrif) {
    return this.musrifService.getAll(query);
  }

  @Put('update/:id')
  async updateMusrif(
    @Param('id') id: string,
    @InjectUpdatedBy() payload: UpdateMusrifDto,
  ) {
    return this.musrifService.update(Number(id), payload);
  }

  @Get('detail/:id')
  async detailMusrif(@Param('id') id: string) {
    return this.musrifService.detail(Number(id));
  }

  @Delete('delete/:id')
  async deleteMusrif(@Param('id') id: string) {
    return this.musrifService.delete(+id);
  }
}
