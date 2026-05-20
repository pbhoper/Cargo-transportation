import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GoodsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: string;

  @Column()
  endDate: number;

  @Column()
  clientId: string;
}