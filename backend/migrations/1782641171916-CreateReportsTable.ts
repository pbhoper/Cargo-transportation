import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateReportsTable1782641171916 implements MigrationInterface {
  name = 'CreateReportsTable1782641171916';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reports',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'startDate',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'endDate',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'clientId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('reports');
  }
}
