import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuthEntity } from './auth.entity';

export enum TokenEntity {
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  RESET_PASSWORD = 'RESET_PASSWORD',
}

@Entity()
export class VerificationToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column({type: 'enum', enum: TokenEntity})
  type: TokenEntity;

  @ManyToOne(() => AuthEntity, { onDelete: 'CASCADE'})
  user: AuthEntity;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}