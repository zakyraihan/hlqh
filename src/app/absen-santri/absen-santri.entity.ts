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

  @ManyToOne(() => SantriHalaqoh) // Allow null for santri
  @JoinColumn({ name: 'nama_santri' })
  santri: SantriHalaqoh;

  @ManyToOne(() => User, { nullable: false }) // Allow null for pengampuh
  @JoinColumn({ name: 'pengampuh_id' })
  pengampuh: User;

  @Column({ nullable: true }) // Allow null for dariSurat
  dariSurat: string;

  @Column({ nullable: true }) // Allow null for sampaiSurat
  sampaiSurat: string;

  @Column({ nullable: true }) // Allow null for dariAyat
  dariAyat: number;

  @Column({ nullable: true }) // Allow null for sampaiAyat
  sampaiAyat: number;

  @Column({
    type: 'enum',
    enum: AbsenStatus,
    default: AbsenStatus.HADIR, // Default value (optional)
  })
  status: AbsenStatus;

  @Column({ nullable: true }) // Allow null for keterangan
  keterangan: string;

  @ManyToOne(() => User, { nullable: true }) // Allow null for created_by
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @ManyToOne(() => User, { nullable: true }) // Allow null for updated_by
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;

  @Column({
    type: 'datetime',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}
