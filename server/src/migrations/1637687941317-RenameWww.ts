import { MigrationInterface, QueryRunner } from 'typeorm'

export class RenameWww1637687941317 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
         update topic set name = 'WWW News' where hex = 'a3a3a3a3';
         `)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(_: QueryRunner): Promise<void> {}
}
