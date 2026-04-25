import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class WaybillEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nameDriver: string;

  @Column()
  vehicle: string;

  @Column()
  fromCity: string;

  @Column()
  toCity: string;


}