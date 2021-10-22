import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPictureFiledToProduct1616977571454
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',

      new TableColumn({
        name: 'picture_id',

        type: 'varchar',

        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'picture_id');
  }
}
