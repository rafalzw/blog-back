import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface } from '../interfaces/user';

@Entity()
export class User extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 60,
    unique: true,
  })
  username: string;

  @Column({
    length: 255,
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    default: null,
    nullable: true,
  })
  profilePicture: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
