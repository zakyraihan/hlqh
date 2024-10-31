/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { SantriHalaqoh } from './santri.entity';
import { CreateSantriHalaqohDto, findAllSantriHalaqohDto } from './santri.dto';
import BaseResponse from 'src/utils/response/base.response';
import { REQUEST } from '@nestjs/core';
import { ResponsePagination, ResponseSuccess } from 'src/interface/response';

@Injectable()
export class SantriHalaqohService extends BaseResponse {
  constructor(
    @InjectRepository(SantriHalaqoh)
    private readonly santriHalaqohRepository: Repository<SantriHalaqoh>,
    @Inject(REQUEST) private req: any,
  ) {
    super();
  }

  async create(payload: CreateSantriHalaqohDto): Promise<ResponseSuccess> {
    try {
      await this.santriHalaqohRepository.save({
        ...payload,
        pengampuh: {
          id: this.req.user.id,
        },
        created_by: {
          id: this.req.user.id,
        },
      });

      console.log(payload);

      return this._success('BERHASIL', payload);
    } catch (error) {
      throw new HttpException('Ada Kesalahan', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getAllSantri(
    query: findAllSantriHalaqohDto,
  ): Promise<ResponsePagination> {
    const { page, pageSize, limit, nama_santri } = query;

    const filterQuery: any = {
      created_by: {
        id: this.req.user.id,
      },
    };

    if (nama_santri) {
      filterQuery.nama_santri = Like(`%${nama_santri}%`);
    }
    const total = await this.santriHalaqohRepository.count({
      where: filterQuery,
    });

    const result = await this.santriHalaqohRepository.find({
      where: filterQuery,
      relations: ['pengampuh', 'created_by', 'updated_by'], // relasi yang aka ditampilkan saat menampilkan list kategori
      select: {
        // pilih data mana saja yang akan ditampilkan dari tabel kategori
        id: true,
        nama_santri: true,
        pengampuh: {
          id: true,
          nama: true,
        },
        created_by: {
          id: true, // pilih field  yang akan ditampilkan dari tabel user
          nama: true,
        },
        updated_by: {
          id: true, // pilih field yang akan ditampilkan dari tabel user
          nama: true,
        },
      },
      skip: limit,
      take: pageSize,
    });

    return this._pagination('OK', result, total, page, pageSize);
  }
}
