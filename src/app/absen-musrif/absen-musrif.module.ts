import { Module } from '@nestjs/common';
import { AbsenMusrifController } from './absen-musrif.controller';
import { AbsenMusrifService } from './absen-musrif.service';
import { AbsensiMusrif } from './absen-musrif.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AbsensiMusrif])],

  controllers: [AbsenMusrifController],
  providers: [AbsenMusrifService],
})
export class AbsenMusrifModule {}
