import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWarehouseTable1782641684325 implements MigrationInterface {
  name = 'CreateWarehouseTable1782641684325';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'warehouses',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'street',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'house',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'apartment',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'isTrusted',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('warehouses');
  }
}
