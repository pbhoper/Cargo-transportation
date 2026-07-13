import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailVerification1783522834259 implements MigrationInterface {
    name = 'AddEmailVerification1783522834259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "write_off_entity" ("id" SERIAL NOT NULL, "date" character varying NOT NULL, "totalLoss" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_cc8a2e3ba8491d735ca191d127d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "waybill_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_44b2b6f758f151b2b5c35697605" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "middleName" character varying(50), "birthDate" date, "email" character varying(100) NOT NULL, "city" character varying(100), "street" character varying(100), "house" character varying(20), "apartment" character varying(10), "login" character varying(100) NOT NULL, "passwordHash" character varying(255) NOT NULL, "role" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."verification_token_type_enum" AS ENUM('VERIFY_EMAIL', 'RESET_PASSWORD')`);
        await queryRunner.query(`CREATE TABLE "verification_token" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "type" "public"."verification_token_type_enum" NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_74bc3066ea24f13f37d52a12c79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "goods_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "quantity" integer NOT NULL, "status" character varying NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_93e3fc0a8d7ad6fd4468f0247a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "waybill_entity_tths_tth" ("waybillEntityId" integer NOT NULL, "tthId" integer NOT NULL, CONSTRAINT "PK_122269009e1385d0b95b780af96" PRIMARY KEY ("waybillEntityId", "tthId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b7c51e2178b4086a3b4a5fc268" ON "waybill_entity_tths_tth" ("waybillEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce33bd20b6e76f43afc211fce4" ON "waybill_entity_tths_tth" ("tthId") `);
        await queryRunner.query(`ALTER TABLE "clients" ADD "is_verified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "verification_token" character varying`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "verification_token_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "username" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "UQ_clients_email"`);
        await queryRunner.query(`ALTER TABLE "waybill_entity" ADD CONSTRAINT "FK_4b225f50231ee109685bd023b0d" FOREIGN KEY ("userId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "verification_token" ADD CONSTRAINT "FK_0748c047a951e34c0b686bfadb2" FOREIGN KEY ("userId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "waybill_entity_tths_tth" ADD CONSTRAINT "FK_b7c51e2178b4086a3b4a5fc268e" FOREIGN KEY ("waybillEntityId") REFERENCES "waybill_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "waybill_entity_tths_tth" ADD CONSTRAINT "FK_ce33bd20b6e76f43afc211fce41" FOREIGN KEY ("tthId") REFERENCES "tth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "waybill_entity_tths_tth" DROP CONSTRAINT "FK_ce33bd20b6e76f43afc211fce41"`);
        await queryRunner.query(`ALTER TABLE "waybill_entity_tths_tth" DROP CONSTRAINT "FK_b7c51e2178b4086a3b4a5fc268e"`);
        await queryRunner.query(`ALTER TABLE "verification_token" DROP CONSTRAINT "FK_0748c047a951e34c0b686bfadb2"`);
        await queryRunner.query(`ALTER TABLE "waybill_entity" DROP CONSTRAINT "FK_4b225f50231ee109685bd023b0d"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "UQ_clients_email" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "username" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "verification_token_at"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "verification_token"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "is_verified"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce33bd20b6e76f43afc211fce4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b7c51e2178b4086a3b4a5fc268"`);
        await queryRunner.query(`DROP TABLE "waybill_entity_tths_tth"`);
        await queryRunner.query(`DROP TABLE "goods_entity"`);
        await queryRunner.query(`DROP TABLE "verification_token"`);
        await queryRunner.query(`DROP TYPE "public"."verification_token_type_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "waybill_entity"`);
        await queryRunner.query(`DROP TABLE "write_off_entity"`);
    }

}
