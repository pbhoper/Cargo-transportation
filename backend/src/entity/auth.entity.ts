import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clients')
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  address: string;

  @Column({ default: 'NEW' })
  status: string;
}
