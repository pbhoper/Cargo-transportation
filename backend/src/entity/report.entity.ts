import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reports')
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column({ nullable: true })
  clientId?: string;

  @Column({ nullable: true })
  userId: number;
}
