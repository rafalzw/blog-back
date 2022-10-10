import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostInterface } from '../types/post';
import { User } from '../user/user.entity';
import { UserInterface } from '../types';

@Entity()
export class PostEntity extends BaseEntity implements PostInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    default: null,
    nullable: true,
  })
  photo: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: null,
    nullable: true,
  })
  updatedAt: Date;

  @ManyToOne((type) => User, (entity: User) => entity.post)
  @JoinColumn()
  user: UserInterface;
}
