import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { User } from '../auth/auth.entity';

@Entity()
export class SantriHalaqoh extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nama_santri: string;

  @Column({ nullable: false })
  kelas: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'pengampuh' })
  pengampuh: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;
}
