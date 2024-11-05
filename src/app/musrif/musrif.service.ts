import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MusrifEntity } from './musrif.entity';
import { Like, Repository } from 'typeorm';
import { User } from '../auth/auth.entity';
import BaseResponse from 'src/utils/response/base.response';
import { REQUEST } from '@nestjs/core';
import { ResponsePagination, ResponseSuccess } from 'src/interface/response';
import { CreateMusrifDto, FindAllMusrif, UpdateMusrifDto } from './musrif.dto';

@Injectable()
export class MusrifService extends BaseResponse {
  constructor(
    @InjectRepository(MusrifEntity)
    private readonly musrifRepository: Repository<MusrifEntity>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(REQUEST) private req: any,
  ) {
    super();
  }

  async create(payload: CreateMusrifDto): Promise<ResponseSuccess> {
    try {
      await this.musrifRepository.save({
        ...payload,
        created_by: {
          id: this.req.user.id,
        },
      });

      return this._success('succes', payload);
    } catch (error) {
      throw new HttpException('Ada Kesalahan', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getAll(query: FindAllMusrif): Promise<ResponsePagination> {
    const { limit, nama_musrif, page, pageSize, total_page } = query;

    const filterQuery: any = {
      //   created_by: {
      //     id: this.req.user.id,
      //   },
    };

    if (nama_musrif) {
      filterQuery.nama_musrif = Like(`%${nama_musrif}%`);
    }

    const total = await this.musrifRepository.count({
      where: filterQuery,
    });

    const result = await this.musrifRepository.find({
      relations: ['created_by'],
      select: {
        id: true,
        nama_musrif: true,
        created_by: {
          id: true,
          nama: true,
        },
        created_at: true,
      },
      skip: limit,
      take: pageSize,
    });

    return this._pagination('succes', result, total, page, pageSize);
  }

  async update(id: number, payload: UpdateMusrifDto): Promise<ResponseSuccess> {
    const check = await this.musrifRepository.findOne({
      where: {
        id,
      },
    });

    if (!check)
      throw new NotFoundException(`musrif deengan id ${id} tidak ditemukan`);

    const update = await this.musrifRepository.save({
      ...payload,
      id: id,
      updated_by: {
        id: this.req.user.id,
      },
    });

    return this._success('Berhasil MengUpdate Data Musrif', update);
  }

  async delete(id: number): Promise<ResponseSuccess> {
    const check = await this.musrifRepository.findOne({
      where: {
        id,
      },
    });

    if (!check)
      throw new NotFoundException(`musrif deengan id ${id} tidak ditemukan`);

    await this.musrifRepository.delete(id);

    return this._success('Berhasil menghapus Data Musrif');
  }
}
