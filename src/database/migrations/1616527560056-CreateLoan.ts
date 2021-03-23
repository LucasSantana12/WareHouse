import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export default class CreateLoan1616527560056 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'loans',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name:'product_id',
            type:'uuid',
            isNullable: true,
          },
          {
            name:'user_id',
            type:'uuid',
            isNullable: true,
          },

          {
            name: 'tomb',
            type: 'int',
          },
          {
            name: 'returned',
            type: 'boolean',
            default:false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ]
      }
    ));

    await queryRunner.createForeignKey(
        'loans', new TableForeignKey({
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            name: 'LoansProduct',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }),
    );

    await queryRunner.createForeignKey(
      'loans', new TableForeignKey({
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          name: 'LoansUsers',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
      }),
  );
}

public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('loans', 'LoansProduct');
    await queryRunner.dropForeignKey('loans', 'LoansUsers');
    await queryRunner.dropTable('loans')
}

}
