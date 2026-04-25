import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enum/roles.enum';


@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, type: 'varchar', nullable: false })
  firstName: string;

  @Column({ length: 50, type: 'varchar', nullable: false })
  lastName: string;

  @Column({ length: 50, type: 'varchar', nullable: true })
  middleName?: string;

  @Column({ type: 'date', nullable: true })
  birthDate?: Date;

  @Column({ length: 100, type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ length: 100, type: 'varchar', nullable: true })
  city: string | null;

  @Column({ length: 100, type: 'varchar', nullable: true })
  street: string | null;

  @Column({ length: 20, type: 'varchar', nullable: true })
  house: string | null;

  @Column({ length: 10, type: 'varchar', nullable: true })
  apartment?: string;

  @Column({ length: 100, type: 'varchar', nullable: false })
  login: string;

  @Column({ length: 255, type: 'varchar', nullable: false })
  passwordHash: string;

  @Column({ enum: Role, nullable: false })
  role: Role;

  // delete
  @Column({ type: 'uuid', nullable: true })
  clientId: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}