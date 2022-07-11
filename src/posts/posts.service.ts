import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AddPostDto } from './dto/add-post.dto';
import {
  AddPostResponse,
  DeletePostResponse,
  GetAllPostsResponse,
  GetOnePostResponse,
  PostInterface,
  UpdatePostResponse,
} from '../types/post';
import { PostEntity } from './post.entity';
import { UsersService } from '../users/users.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { MulterDiskUploadedFiles } from '../types/files';
import * as fs from 'fs';
import * as path from 'path';
import { storageDir } from '../utils/storage';

@Injectable()
export class PostsService {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  filter(post: PostEntity): PostInterface {
    const { id, title, content, photo, createdAt, updatedAt, user } = post;
    return { id, title, content, photo, createdAt, updatedAt, user };
  }

  async getAll(query): Promise<GetAllPostsResponse> {
    let posts;

    if (query.id) {
      const user = await this.usersService.getOne(query.id);
      posts = await PostEntity.find({
        where: { user },
        relations: ['user'],
      });
    } else {
      posts = await PostEntity.find({
        relations: ['user'],
      });
    }

    return posts.map(this.filter);
  }

  async getOne(id: string): Promise<GetOnePostResponse> {
    const post = await PostEntity.findOne({
      where: { id },
      relations: ['user'],
    });
    return this.filter(post);
  }

  async add(
    post: AddPostDto,
    files: MulterDiskUploadedFiles,
  ): Promise<AddPostResponse> {
    const { title, content, userId } = post;
    const photo = files?.photo?.[0] ?? null;

    try {
      const newPost = new PostEntity();
      newPost.title = title;
      newPost.content = content;
      newPost.user = userId;

      if (photo) {
        newPost.photo = photo.filename;
      }

      await newPost.save();

      return this.filter(newPost);
    } catch (e) {
      try {
        if (photo) {
          fs.unlinkSync(path.join(storageDir(), 'post-photos', photo.filename));
        }
      } catch (e2) {}

      throw e;
    }
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
    // post.photo = updatedPost.photo;
    post.updatedAt = new Date();

    await PostEntity.save(
      Object.assign({}, post, post.title, post.content, post.updatedAt),
    );

    return {
      id: post.id,
      title: post.title,
    };
  }

  async delete(id: string): Promise<DeletePostResponse> {
    const post = await this.getOne(id);
    const DB = PostEntity;
    console.log(post);

    if (!post) {
      throw new HttpException('Post not found!', HttpStatus.BAD_REQUEST);
    }

    await DB.delete(post.id);

    return {
      isSuccess: true,
    };
  }
}
