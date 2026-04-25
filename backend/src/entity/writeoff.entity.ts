import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class WriteOffEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  date: string

  @Column()
  totalLoss: number

  @Column()
  quantity: number
}