import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn, CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('warehouses')
export class WarehousesEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  city: string;

  @Column()
  @ApiProperty()
  street: string;

  @Column()
  @ApiProperty()
  house: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  apartment?: string;

  @Column({ default: false })
  @ApiProperty()
  isTrusted: boolean;

  @DeleteDateColumn()
  DeletedAt: Date;

  @CreateDateColumn()
  CreatedAt: Date;
}
