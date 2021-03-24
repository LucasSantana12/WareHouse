import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnsOnLoan1616556246093
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users_loans_products',
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isNullable: true,
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      }),
    );

    await queryRunner.addColumn(
      'users_loans_products',
      new TableColumn({
        name: 'tomb',
        type: 'int',
      }),
    );

    await queryRunner.addColumn(
      'users_loans_products',
      new TableColumn({
        name: 'returned',
        type: 'boolean',
        default: false,
      }),
    );

    await queryRunner.addColumn(
      'users_loans_products',
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );

    await queryRunner.addColumn(
      'users_loans_products',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users_loans_products', 'id');
    await queryRunner.dropColumn('users_loans_products', 'tomb');
    await queryRunner.dropColumn('users_loans_products', 'returned');
    await queryRunner.dropColumn('users_loans_products', 'created_at');
    await queryRunner.dropColumn('users_loans_products', 'updated_at');
  }
}
