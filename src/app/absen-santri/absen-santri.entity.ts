import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { SantriHalaqoh } from '../santri/santri.entity';
import { User } from '../auth/auth.entity';
import { MusrifEntity } from '../musrif/musrif.entity';

export enum AbsenStatus {
  HADIR = 'HADIR',
  TIDAK_HADIR = 'TIDAK_HADIR',
  IZIN = 'IZIN',
  SAKIT = 'SAKIT',
  ALPHA = 'ALPHA',
}

export enum TipeAbsen {
  PAGI = "pagi",
  SORE = "sore"
}

@Entity()
export class AbsenSantri extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SantriHalaqoh)
  @JoinColumn({ name: 'nama_santri' })
  santri: SantriHalaqoh;

  @Column({ nullable: true })
  dariSurat: string;

  @Column({ nullable: true })
  namaMusrif: string;

  @Column({ nullable: true })
  sampaiSurat: string;

  @Column({ nullable: true })
  dariAyat: number;

  @Column({ nullable: true })
  sampaiAyat: number;

  @Column({
    type: 'enum',
    enum: AbsenStatus,
    default: AbsenStatus.HADIR,
  })
  status: AbsenStatus;
  @Column({
    type: 'enum',
    enum: TipeAbsen,
    default: TipeAbsen.PAGI,
  })
  tipe: TipeAbsen;

  @Column({ nullable: true })
  keterangan: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}
