import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTTHTable1782555683434 implements MigrationInterface {
  name = 'CreateTTHTable1782555683434';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tth',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dateCreated',
            type: 'varchar',
          },
          {
            name: 'notes',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'senderName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'senderId',
            type: 'varchar',
          },
          {
            name: 'senderAddress',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'senderType',
            type: 'enum',
            enum: [
              'COMPLETED',
              'VERIFICATION_COMPLETED',
              'DELIVERED',
              'Client',
              'COMPANY',
              'WAREHOUSE',
              'SHOP',
              'MINIBUS',
              'FURNITUREVAN',
              'TRUCK',
            ],
            isNullable: true,
          },
          {
            name: 'recipientId',
            type: 'varchar',
          },
          {
            name: 'recipientName',
            type: 'varchar',
          },
          {
            name: 'recipientAddress',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'recipientType',
            type: 'enum',
            enum: [
              'COMPLETED',
              'VERIFICATION_COMPLETED',
              'DELIVERED',
              'Client',
              'COMPANY',
              'WAREHOUSE',
              'SHOP',
              'MINIBUS',
              'FURNITUREVAN',
              'TRUCK',
            ],
            isNullable: true,
          },
          {
            name: 'vehicleId',
            type: 'varchar',
          },
          {
            name: 'vehicleBrandModel',
            type: 'varchar',
          },
          {
            name: 'vehicleLicensePlate',
            type: 'varchar',
          },
          {
            name: 'vehicleType',
            type: 'enum',
            enum: [
              'COMPLETED',
              'VERIFICATION_COMPLETED',
              'DELIVERED',
              'Client',
              'COMPANY',
              'WAREHOUSE',
              'SHOP',
              'MINIBUS',
              'FURNITUREVAN',
              'TRUCK',
            ],
            isNullable: true,
          },
          {
            name: 'driverId',
            type: 'varchar',
          },
          {
            name: 'driverFullName',
            type: 'varchar',
          },
          {
            name: 'driverPassport',
            type: 'varchar',
          },
          {
            name: 'driverPhone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'items',
            type: 'json',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tth');
  }
}
