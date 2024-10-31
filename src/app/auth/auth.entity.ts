import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ResetPassword } from './reset_password.entity';
import { AbsenSantri } from '../absen-santri/absen-santri.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: false })
  nama: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ nullable: false })
  role: string;

  @OneToMany(() => ResetPassword, (reset) => reset.user) // buat relasi one to many dengan tabel reset password
  reset_password: ResetPassword;

  @OneToMany(() => AbsenSantri, (absenSantri) => absenSantri.created_by) // buat relasi one to many dengan tabel reset password
  absen_santri: AbsenSantri;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
