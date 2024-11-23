import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';

import {
  Repository,
  MoreThanOrEqual,
  LessThanOrEqual,
  Like,
  Between,
} from 'typeorm';
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
  async absenMasuk(): Promise<ResponseSuccess> {
    try {
      // Get the current date (without time) to check for existing entries on the same day
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight for comparison

      const existingEntry = await this.absensiRepository.findOne({
        where: {
          nama: {
            id: this.req.user.id,
          },
          tanggal_masuk: Between(
            today,
            new Date(today.getTime() + 24 * 60 * 60 * 1000),
          ),
        },
      });

      if (existingEntry) {
        return {
          status: 'Error',
          message: 'Anda sudah absen masuk hari ini',
        };
      }

      // Create a new clock-in entry
      const newEntry = await this.absensiRepository.save({
        nama: {
          id: this.req.user.id,
        },
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

  async findAllAbsensi(): Promise<ResponseSuccess> {
    const get = await this.absensiRepository.find({
      relations: ['nama'],
      select: {
        nama: {
          id: true,
          nama: true,
          email: true,
          role: true,
          avatar: true,
        },
        tanggal_masuk: true,
        hadir: true,
        shift: true,
        tanggal_keluar: true,
      },
    });

    return {
      status: 'ok',
      message: 'Berhasil mendapatkan List Absen',
      data: get,
    };
  }

  // Absen Keluar (Clock-Out)
  async absenKeluar(payload: CreateAbsenKeluarDto): Promise<ResponseSuccess> {
    const date = new Date().toLocaleString();

    try {
      const absenRecord = await this.absensiRepository.findOne({
        where: { id: payload.id },
      });

      if (!absenRecord) {
        throw new HttpException('Record tidak ditemukan', HttpStatus.NOT_FOUND);
      }

      if (absenRecord.tanggal_keluar) {
        return {
          status: 'Error',
          message: 'Anda sudah absen keluar hari ini',
        };
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
