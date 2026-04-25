import { Column, Entity,  PrimaryGeneratedColumn } from 'typeorm';
import {GoodsEnum } from '../enum/goods.enum';

@Entity()
export class GoodsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  status: GoodsEnum;

  @Column()
  price: number;

  @Column()
  createdAt: Date;
}