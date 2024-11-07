/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { SantriHalaqoh } from './santri.entity';
import {
  CreateSantriHalaqohDto,
  findAllSantriHalaqohDto,
  UpdateSantriHalaqohDto,
} from './santri.dto';
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
        musrif: {
          id: payload.musrif_id,
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
      // musrif: {
      //   id: this.req.user.id,
      // },
    };

    if (nama_santri) {
      filterQuery.nama_santri = Like(`%${nama_santri}%`);
    }
    const total = await this.santriHalaqohRepository.count({
      where: filterQuery,
    });

    const result = await this.santriHalaqohRepository.find({
      where: filterQuery,
      relations: ['musrif', 'created_by', 'updated_by'],
      select: {
        id: true,
        nama_santri: true,
        kelas: true,
        musrif: {
          id: true,
          nama_musrif: true,
        },
        created_by: {
          id: true,
          nama: true,
        },
        updated_by: {
          id: true,
          nama: true,
        },
      },
      skip: limit,
      take: pageSize,
    });

    return this._pagination('OK', result, total, page, pageSize);
  }

  async update(
    id: number,
    payload: UpdateSantriHalaqohDto,
  ): Promise<ResponseSuccess> {
    const check = await this.santriHalaqohRepository.findOne({
      where: {
        id,
      },
    });

    if (!check)
      throw new NotFoundException(`anggota deengan id ${id} tidak ditemukan`);

    const update = await this.santriHalaqohRepository.save({
      ...payload,
      id: id,
      musrif: {
        id: payload.musrif_id,
      },
      updated_by: {
        id: this.req.user.id,
      },
    });

    return this._success('Berhasil MengUpdate Data', update);
  }

  async delete(id: number): Promise<ResponseSuccess> {
    const check = await this.santriHalaqohRepository.findOne({
      where: {
        id,
      },
    });

    if (!check)
      throw new NotFoundException(`anggota  dengan id ${id} tidak ditemukan`);

    await this.santriHalaqohRepository.delete(id);

    return this._success('Berhasil Menghapus');
  }

  async getSantriDetail(id: number): Promise<ResponseSuccess> {
    try {
      // Find the santri by ID with related musrif details
      const santri = await this.santriHalaqohRepository.findOne({
        where: { id },
        relations: ['musrif'], // Include musrif relation
        select: {
          id: true,
          nama_santri: true,
          kelas: true,
          musrif: {
            id: true,
            nama_musrif: true,
          },
        },
      });

      if (!santri) {
        throw new HttpException('Santri tidak ditemukan', HttpStatus.NOT_FOUND);
      }

      return this._success('Detail santri ditemukan', santri);
    } catch (error) {
      throw new HttpException(
        'Ada Kesalahan saat mengambil detail santri',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
