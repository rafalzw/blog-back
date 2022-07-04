import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AddPostDto } from './dto/add-post.dto';
import {
  AddPostResponse,
  DeletePostResponse,
  GetOnePostResponse,
  UpdatePostResponse,
} from '../interfaces/post';
import { PostEntity } from './post.entity';
import { UsersService } from '../users/users.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';

@Injectable()
export class PostsService {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  async getAll(user) {
    let posts;
    if (user) {
      posts = await PostEntity.find({
        where: { user },
        relations: ['user'],
      });
    } else {
      posts = await PostEntity.find();
    }

    return posts;
  }

  async getOne(id: string): Promise<GetOnePostResponse> {
    return await PostEntity.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async add(post: AddPostDto): Promise<PostEntity> {
    const { title, content, photo, userId } = post;

    const newPost = new PostEntity();
    newPost.title = title;
    newPost.content = content;
    newPost.photo = photo;
    newPost.user = userId;

    await newPost.save();
    return newPost;
  }

  async update(
    id: string,
    updatedPost: UpdatePostDto,
  ): Promise<UpdatePostResponse> {
    const post = await this.getOne(id);

    if (!post) {
      throw new HttpException('Post not found!', HttpStatus.BAD_REQUEST);
    }

    if (post.user.id !== updatedPost.user) {
      throw new HttpException(
        'You can edit only your posts!',
        HttpStatus.BAD_REQUEST,
      );
    }
    post.title = updatedPost.title;
    post.content = updatedPost.content;
    post.photo = updatedPost.photo;
    post.updatedAt = new Date();

    await post.save();

    return {
      id: post.id,
      title: post.title,
    };
  }

  async delete(
    id: string,
    updatedPost: DeletePostDto,
  ): Promise<DeletePostResponse> {
    const post = await this.getOne(id);

    if (!post) {
      throw new HttpException('Post not found!', HttpStatus.BAD_REQUEST);
    }

    if (post.user.id !== String(updatedPost.user)) {
      throw new HttpException(
        'You can delete only your posts!',
        HttpStatus.BAD_REQUEST,
      );
    }
    await post.remove();

    return {
      isSuccess: true,
    };
  }
}
