import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Like, Repository } from 'typeorm';
import { AbsenSantri, AbsenStatus } from './absen-santri.entity';
import {
  CreateAbsenSantriArrayDto,
  CreateAbsenSantriDto,
  FindAllAbsenSantriDto,
  UpdateAbsenSantriDto,
} from './absen-santri.dto';
import { SantriHalaqoh } from '../santri/santri.entity';
import { User } from '../auth/auth.entity';
import { ResponsePagination, ResponseSuccess } from 'src/interface/response';
import { REQUEST } from '@nestjs/core';

import BaseResponse from 'src/utils/response/base.response';
import { Exception } from 'handlebars';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AbsenSantriService extends BaseResponse {
  constructor(
    @InjectRepository(AbsenSantri)
    private readonly absenSantriRepository: Repository<AbsenSantri>,

    @InjectRepository(SantriHalaqoh)
    private readonly santriRepository: Repository<SantriHalaqoh>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(REQUEST) private req: any,
  ) {
    super();
  }

  @Cron('0 0 * * *')
  async removeOldRecords() {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

    const result = await this.absenSantriRepository.delete({
      created_at: LessThan(twentyFourHoursAgo),
    });

    console.log(`Old records deleted: ${result.affected} rows`);
    // return this._success(
    //   `Old records deleted: ${result.affected} rows`,
    //   result,
    // );
  }

  async createBulk() // payload: CreateAbsenSantriArrayDto,
  : Promise<ResponseSuccess> {
    try {
      let berhasil = 0;
      let gagal = 0;

      const santris = await this.santriRepository.find({
        relations: {
          pengampuh: true,
          created_by: true,
        },
        select: {
          id: true,
          nama_santri: true,
          kelas: true,
          created_by: {
            id: this.req.user.id,
          },
          pengampuh: {
            id: true,
            nama: true,
            email: true,
          },
        },
      });
      console.log(santris);

      await Promise.all(
        santris.map(async (santri) => {
          const dataSave = {
            santri: { id: santri.id },
            pengampuh: { id: santri.pengampuh.id },
            dariSurat: null,
            sampaiSurat: null,
            dariAyat: null,
            sampaiAyat: null,
            status: AbsenStatus.TIDAK_HADIR,
            keterangan: null,
            created_by: { id: this.req.user.id },
            // created_at: new Date(),
          };

          await this.absenSantriRepository.save(dataSave);
          berhasil += 1;

          try {
          } catch (err) {
            console.log('err', err);
            gagal += 1;
          }
        }),
      );

      // await Promise.all(
      //   payload.data.map(async (data) => {
      //     const dataSave = {
      //       ...data,
      //       santri: { id: data.santri },
      //       pengampuh: { id: data.pengampuh },
      //       created_by: { id: data.pengampuh },
      //     };

      //     try {
      //       await this.absenSantriRepository.save(dataSave);

      //       berhasil += 1;
      //     } catch (err) {
      //       console.log('err', err);
      //       gagal += 1;
      //     }
      //   }),
      // );

      return this._success(`Berhasil menyimpan ${berhasil} dan gagal ${gagal}`);
    } catch (err) {
      console.log('err', err);
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(query: FindAllAbsenSantriDto): Promise<ResponsePagination> {
    const {
      page,
      pageSize,
      limit,

      nama_santri,
      kelas,
    } = query;

    const filterQuery: any = {
      created_by: {
        id: this.req.user.id,
      },
      pengampuh: {
        id: this.req.user.id,
      },
    };

    if (nama_santri) {
      filterQuery.nama_santri = Like(`%${nama_santri}%`);
    }
    if (kelas) {
      filterQuery.kelas = Like(`%${kelas}%`);
    }

    const total = await this.absenSantriRepository.count({
      where: filterQuery,
    });
    const result = await this.absenSantriRepository.find({
      where: filterQuery,
      relations: ['created_by', 'updated_by', 'santri', 'pengampuh'],
      select: {
        id: true,
        santri: {
          id: true,
          nama_santri: true,
          kelas: true,
        },

        pengampuh: {
          id: true,
          nama: true,
        },
        dariSurat: true,
        sampaiSurat: true,
        dariAyat: true,
        sampaiAyat: true,
        status: true,
        keterangan: true,
        created_at: true,
        // updated_at: true,
        created_by: {
          id: true,
          nama: true,
        },
        updated_by: {
          id: true,
          nama: true,
        },
      },
      order: {
        created_at: 'DESC',
      },
      skip: limit,
      take: pageSize,
    });
    return this._pagination(
      'berhasil mendapatkan list absen santri',
      result,
      total,
      page,
      pageSize,
    );
  }

  async update(
    id: number,
    UpdateAbsenSantriDto: UpdateAbsenSantriDto,
  ): Promise<ResponseSuccess> {
    const check = await this.absenSantriRepository.findOne({
      where: {
        id,
      },
    });

    if (!check) {
      throw new NotFoundException(
        `absen santri deengan id ${id} tidak ditemukan`,
      );
    }

    const result = await this.absenSantriRepository.save({
      ...UpdateAbsenSantriDto,
      id: id,
      updated_by: {
        id: this.req.user.id,
      },
      updated_at: new Date(),
    });

    return this._success('berhasil update absen', result);
  }

  async findOne(id: number): Promise<ResponseSuccess> {
    const absen = await this.absenSantriRepository.findOne({
      where: { id },
      relations: ['santri', 'pengampuh'],
    });

    if (!absen) {
      throw new NotFoundException(`AbsenSantri with ID ${id} not found`);
    }

    const result = {
      id: absen.id,
      dariSurat: absen.dariSurat,
      sampaiSurat: absen.sampaiSurat,
      dariAyat: absen.dariAyat,
      sampaiAyat: absen.sampaiAyat,
      status: absen.status,
      keterangan: absen.keterangan,
      created_at: absen.created_at,
      updated_at: absen.updated_at,
      santri: {
        id: absen.santri.id,
        nama_santri: absen.santri.nama_santri,
        kelas: absen.santri.kelas,
      },
      pengampuh: {
        id: absen.pengampuh.id,
        nama: absen.pengampuh.nama,
      },
    };

    return this._success('berhasil mendapatkan detail', result);
  }

  async delete(id: number): Promise<ResponseSuccess> {
    const chek = await this.absenSantriRepository.findOne({
      where: {
        id,
      },
    });

    if (!chek) {
      throw new NotFoundException(`Buku dengan id ${id} tidak ditemukan`);
    }

    const result = await this.absenSantriRepository.delete(id);

    return this._success('Berhasil Menghapus Absen', result);
  }
}
