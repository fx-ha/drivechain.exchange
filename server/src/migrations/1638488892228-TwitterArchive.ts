import { MigrationInterface, QueryRunner } from 'typeorm'

export class TwitterArchive1638488892228 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
         insert into topic (hex, name) values ('42042069', 'Twitter Archive');
         `)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(_: QueryRunner): Promise<void> {}
}
