import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TthEntity } from './tth.entity';

@Entity()
export class WaybillEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => TthEntity, (tth) => tth.waybills, { cascade: true })
  @JoinTable()
  tths: TthEntity[];
}
