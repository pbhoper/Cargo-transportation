import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { TthEnum } from '../enum/tth.enum';
import { TthItemDto } from '../dto/tth.item-dto';
import { WaybillEntity } from './waybill.entity';

@Entity('tth')
export class TthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  number?: string;

  @Column()
  dateCreated: string;

  @Column({ nullable: true })
  notes?: string;

  @Column({ nullable: true })
  userId?: number;

  @ManyToMany(() => WaybillEntity, (waybill) => waybill.tths)
  waybills: WaybillEntity[];

  @Column({ nullable: true })
  senderName?: string;

  @Column()
  senderId: string;

  @Column({ nullable: true })
  senderAddress?: string;

  @Column({ type: 'enum', enum: TthEnum, nullable: true })
  senderType?: TthEnum;

  @Column()
  recipientId: string;

  @Column()
  recipientName: string;

  @Column({ nullable: true })
  recipientAddress?: string;

  @Column({ type: 'enum', enum: TthEnum, nullable: true })
  recipientType?: TthEnum;

  @Column()
  vehicleId: string;

  @Column()
  vehicleBrandModel: string;

  @Column()
  vehicleLicensePlate: string;

  @Column({ type: 'enum', enum: TthEnum, nullable: true })
  vehicleType?: TthEnum;

  @Column()
  driverId: string;

  @Column()
  driverFullName: string;

  @Column()
  driverPassport: string;

  @Column({ nullable: true })
  driverPhone?: string;

  @Column({ type: 'json', nullable: true })
  items: TthItemDto[];
}
