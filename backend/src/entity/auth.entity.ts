import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clients')
export class AuthEntity {
  @PrimaryGeneratedColumn()

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  passwordRepeat: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
