import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TthEntity } from './tth.entity';
import { AuthEntity } from './auth.entity';

@Entity()
export class WaybillEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => AuthEntity, (auth) => auth.waybills)
  user: AuthEntity;

  @ManyToMany(() => TthEntity, (tth) => tth.waybills, { cascade: true })
  @JoinTable()
  tths: TthEntity[];
}
