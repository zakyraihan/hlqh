import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './app/mail/mail.module';
import { AbsenMusrifModule } from './app/absen-musrif/absen-musrif.module';
import { SantriHalaqohModule } from './app/santri/santri.module';
import { AbsenSantriModule } from './app/absen-santri/absen-santri.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AbsenSantriService } from './app/absen-santri/absen-santri.service';
import { MusrifModule } from './app/musrif/musrif.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const { typeOrmConfig } = await import('./config/typeorm.config');
        return typeOrmConfig;
      },
    }),
    AuthModule,
    MailModule,
    AbsenMusrifModule,
    SantriHalaqohModule,
    AbsenSantriModule,
    MusrifModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
