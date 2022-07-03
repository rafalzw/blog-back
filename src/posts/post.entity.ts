import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInterface } from '../interfaces/user';
import { PostInterface } from '../interfaces/post';
import { User } from '../users/user.entity';

@Entity()
export class Post extends BaseEntity implements PostInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  photo: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne((type) => User, (entity) => entity.post)
  @JoinColumn()
  user: User;
}
