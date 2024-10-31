import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SantriHalaqohController } from './santri.controller';
import { SantriHalaqohService } from './santri.service';
import { SantriHalaqoh } from './santri.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SantriHalaqoh])],
  controllers: [SantriHalaqohController],
  providers: [SantriHalaqohService],
  exports: [TypeOrmModule.forFeature([SantriHalaqoh])],
})
export class SantriHalaqohModule {}
