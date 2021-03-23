import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationLoans1616529496805 implements MigrationInterface {
    name = 'RelationLoans1616529496805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "ProductCategory"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "loansId" uuid`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "category_id" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "products"."category_id" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "matricula"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "matricula" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d6e0fbd2524011bca023b621655" FOREIGN KEY ("loansId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d6e0fbd2524011bca023b621655"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "matricula"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "matricula" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."email" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "products"."category_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "category_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "loansId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "ProductCategory" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

}
