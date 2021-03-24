import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationUserLoanProduct1616555386459
  implements MigrationInterface {
  name = 'RelationUserLoanProduct1616555386459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_loans_products" ("usersId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_b438ef4dcff592fa98b4246f2d0" PRIMARY KEY ("usersId", "productsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a20cf1ec4d1502528016eb6b72" ON "users_loans_products" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f92665810df089ac32636e6d59" ON "users_loans_products" ("productsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_loans_products" ADD CONSTRAINT "FK_a20cf1ec4d1502528016eb6b72f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_loans_products" ADD CONSTRAINT "FK_f92665810df089ac32636e6d591" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_loans_products" DROP CONSTRAINT "FK_f92665810df089ac32636e6d591"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_loans_products" DROP CONSTRAINT "FK_a20cf1ec4d1502528016eb6b72f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_f92665810df089ac32636e6d59"`);
    await queryRunner.query(`DROP INDEX "IDX_a20cf1ec4d1502528016eb6b72"`);
    await queryRunner.query(`DROP TABLE "users_loans_products"`);
  }
}
