import { Module } from '@nestjs/common';
import { MusrifController } from './musrif.controller';
import { MusrifService } from './musrif.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusrifEntity } from './musrif.entity';
import { User } from '../auth/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MusrifEntity, User])],
  controllers: [MusrifController],
  providers: [MusrifService],
})
export class MusrifModule {}
