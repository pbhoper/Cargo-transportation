import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { WaybillEntity } from './waybill.entity';

@Entity('clients')
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ name: 'reset_token', type: 'varchar', nullable: true })
  resetToken: string | null;

  @Column({ name: 'reset_token_at', type: 'timestamp', nullable: true })
  resetTokenAt: Date | null;

  @OneToMany(() => WaybillEntity, (waybill) => waybill.user)
  waybills: WaybillEntity[];

  @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
  roles: 'user' | 'admin';
}
