import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddReturnedOnLoansTable1616802501469
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'loans',
      new TableColumn({
        name: 'returned',
        type: 'boolean',
        default: false,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('loans', 'returned');
  }
}
