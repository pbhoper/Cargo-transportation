import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class CreateClientsTable1783340040083 implements MigrationInterface {
  name = 'CreateClientsTable1783340040083';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "public"."clients_roles_enum" AS ENUM('user', 'admin')
    `);

    await queryRunner.query(`
      CREATE TABLE "clients" (
        "id" SERIAL NOT NULL,
        "username" varchar NULL,
        "email" varchar NOT NULL,
        "password" varchar,
        "firstName" varchar NOT NULL,
        "lastName" varchar NOT NULL,
        "roles" "public"."clients_roles_enum" NOT NULL DEFAULT 'user',
        "reset_token" varchar NULL,
        "reset_token_at" timestamp NULL,
        CONSTRAINT "UQ_clients_username" UNIQUE ("username"),
        CONSTRAINT "UQ_clients_email" UNIQUE ("email"),
        CONSTRAINT "PK_clients_id" PRIMARY KEY ("id")
      )
    `);

    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    await queryRunner.query(
      `
        INSERT INTO "clients" ("username", "email", "password", "firstName", "lastName", "roles")
        VALUES
          ($1, $2, $3, $4, $5, $6),
          ($7, $8, $9, $10, $11, $12)
      `,
      [
        'admin',
        'admin@mail.com',
        adminPassword,
        'Admin',
        'User',
        'admin',
        'asdf',
        'asdf@mail.com',
        userPassword,
        'asdf',
        'asdf',
        'user',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "clients"`);
    await queryRunner.query(`DROP TYPE "public"."clients_roles_enum"`);
  }
}