import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialTopics1635722657741 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
         insert into topic (hex, name) values ('a1a1a1a1', 'US Daily');
         insert into topic (hex, name) values ('a2a2a2a2', 'Japan Daily');
         insert into topic (hex, name) values ('a3a3a3a3', 'Bitcoin Liberation Front Times');
         insert into topic (hex, name) values ('5a5a5a5a', 'Paul News');
         insert into topic (hex, name) values ('01010101', 'Sdoge Cavern');
         insert into topic (hex, name) values ('d1d1d1d1', 'New York Doge');
         `)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(_: QueryRunner): Promise<void> {}
}
