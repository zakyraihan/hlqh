import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../auth/auth.entity';

@Entity()
export class AbsensiMusrif {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'nama' })
  nama: User;

  @Column()
  hadir: boolean;

  @Column()
  shift: string;

  @Column({ type: 'datetime', nullable: true }) // Ensure this is nullable
  tanggal_masuk: Date;

  @Column({ type: 'datetime', nullable: true }) // Ensure this is nullable
  tanggal_keluar: Date;
}
