import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenSantri } from './absen-santri.entity';
import { AbsenSantriController } from './absen-santri.controller';
import { AbsenSantriService } from './absen-santri.service';
import { SantriHalaqoh } from '../santri/santri.entity';
import { User } from '../auth/auth.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([AbsenSantri, SantriHalaqoh, User]),
  ],
  controllers: [AbsenSantriController],
  providers: [AbsenSantriService],
})
export class AbsenSantriModule {}
