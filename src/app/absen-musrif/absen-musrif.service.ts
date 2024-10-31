import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, MoreThanOrEqual, LessThanOrEqual, Like } from 'typeorm';
import { AbsensiMusrif } from './absen-musrif.entity';
import BaseResponse from 'src/utils/response/base.response';
import { ResponsePagination, ResponseSuccess } from 'src/interface/response';
import {
  CreateAbsenMusrifMasukDto,
  CreateAbsenKeluarDto,
  findAllAbsenMusrifDto,
} from './absen-musrif.dto';

@Injectable()
export class AbsenMusrifService extends BaseResponse {
  constructor(
    @InjectRepository(AbsensiMusrif)
    private absensiRepository: Repository<AbsensiMusrif>,
    @Inject(REQUEST) private req: any,
  ) {
    super();
  }
  // Absen Masuk (Clock-In)
  async absenMasuk(
    payload: CreateAbsenMusrifMasukDto,
  ): Promise<ResponseSuccess> {
    try {
      const newEntry = await this.absensiRepository.save({
        ...payload,
        nama: this.req.user.id,
        hadir: true,
        shift: 'halaqoh',
        tanggal_masuk: new Date(), // Auto-set current date and time
      });

      return this._success('Clock-in successful', newEntry);
    } catch (error) {
      throw new HttpException(
        'Ada kesalahan saat absen masuk',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  // Absen Keluar (Clock-Out)
  async absenKeluar(payload: CreateAbsenKeluarDto): Promise<ResponseSuccess> {
    try {
      const absenRecord = await this.absensiRepository.findOne({
        where: { id: payload.id },
      });

      if (!absenRecord) {
        throw new HttpException('Record tidak ditemukan', HttpStatus.NOT_FOUND);
      }

      absenRecord.tanggal_keluar = new Date();
      absenRecord.hadir = false;

      await this.absensiRepository.save(absenRecord);

      return this._success('Clock-out successful', absenRecord);
    } catch (error) {
      throw new HttpException(
        'Ada kesalahan saat absen keluar',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getTodayAttendance(): Promise<AbsensiMusrif[]> {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    return await this.absensiRepository.find({
      where: {
        tanggal_masuk: MoreThanOrEqual(startOfDay),
        tanggal_keluar: LessThanOrEqual(endOfDay),
      },
    });
  }

  async getAllAbsen(query: findAllAbsenMusrifDto): Promise<ResponsePagination> {
    const { page, pageSize, nama } = query;
    const limit = (page - 1) * pageSize;

    // Building the filter query
    const filterQuery: any = {};
    if (nama) {
      filterQuery.nama = Like(`%${nama}%`);
    }

    // Get the total count of absences that match the filter
    const total = await this.absensiRepository.count({
      where: filterQuery,
    });

    const result = await this.absensiRepository.find({
      where: filterQuery,
      skip: limit,
      take: pageSize,
      select: {
        id: true,
        nama: {
          id: true,
          nama: true,
          role: true,
        },
        hadir: true,
        tanggal_masuk: true,
        tanggal_keluar: true,
        shift: true,
      },
    });

    return this._pagination('OK', result, total, page, pageSize);
  }
}
