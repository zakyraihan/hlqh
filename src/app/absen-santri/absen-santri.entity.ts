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

@Entity()
export class AbsenSantri extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SantriHalaqoh)
  @JoinColumn({ name: 'nama_santri' })
  santri: SantriHalaqoh;

  @ManyToOne(() => MusrifEntity, { nullable: false })
  @JoinColumn({ name: 'pengampuh_id' })
  pengampuh: MusrifEntity;

  @Column({ nullable: true })
  dariSurat: string;

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

  @Column({ nullable: true })
  keterangan: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @ManyToOne(() => MusrifEntity, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: MusrifEntity;

  @Column({
    type: 'datetime',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}
