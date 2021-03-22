
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProducts1616422600911 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',

          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false
          },
          {
            name: 'quantity',
            type: 'integer',
            isNullable: false,
          },
          {
            name:'created_at',
            type:'timestamp',
            default:'now()',

        },
        {
            name:'updated_at',
            type:'timestamp',
            default:'now()',
        },
      ]
      })
    );
    }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products')
  }
}
