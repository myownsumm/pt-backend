import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1584807931768 implements MigrationInterface {
  name = 'createUsersTable1584807931768';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`', undefined);
    await queryRunner.query('DROP TABLE `users`', undefined);
  }
}
