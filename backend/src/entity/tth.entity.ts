import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TthItemDto } from '../dto/tth.item-dto';

@Entity('Tth')
export class TthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  number?: string;

  @Column()
  dateCreated: string;

  @Column({ nullable: true })
  notes?: string;

  @Column()
  senderName: string;

  @Column()
  senderId: string;

  @Column({ nullable: true })
  senderAddress?: string;

  @Column({ nullable: true })
  senderType?: 'Client' | 'Company';

  @Column()
  recipientId: string;

  @Column()
  recipientName: string;

  @Column({ nullable: true })
  recipientAddress?: string;

  @Column({ nullable: true })
  recipientType?: 'Warehouse' | 'Shop';

  @Column()
  vehicleId: string;

  @Column()
  vehicleBrandModel: string;

  @Column()
  vehicleLicensePlate: string;

  @Column({ nullable: true })
  vehicleType?: 'Trailer' | 'Refrigerator' | 'Tank';

  @Column()
  driverId: string;

  @Column()
  driverFullName: string;

  @Column()
  driverPassport: string;

  @Column({ nullable: true })
  driverPhone?: string;

  @Column(() => TthItemDto)
  items: TthItemDto[];
}
