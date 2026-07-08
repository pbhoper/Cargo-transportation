import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTTHWaybillTable1783338752318 implements MigrationInterface {
  name = 'CreateTTHWaybillTable1783338752318';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'waybill_tths_tth',
        columns: [
          {
            name: 'waybillId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'tthId',
            type: 'int',
            isPrimary: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'waybill_tths_tth',
      new TableForeignKey({
        columnNames: ['waybillId'],
        referencedTableName: 'waybill',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'waybill_tths_tth',
      new TableForeignKey({
        columnNames: ['tthId'],
        referencedTableName: 'tth',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('waybill_tths_tth');
  }
}
