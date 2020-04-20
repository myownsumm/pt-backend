import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', unique: true, nullable: false})
  email: string;

  @Column({type: 'varchar', nullable: false})
  password: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  created_at: Date;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updated_at: Date;
}
