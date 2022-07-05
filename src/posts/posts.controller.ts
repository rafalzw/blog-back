import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
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
import { UpdatePostDto } from './dto/update-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { User } from '../users/user.entity';
import { UserInterface } from '../types';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject(PostsService) private readonly postsService: PostsService,
  ) {}

  @Get('/')
  getAllPosts(@Query() query: string): Promise<GetAllPostsResponse> {
    return this.postsService.getAll(query);
  }

  @Get('/:id')
  getOnePost(@Param('id') id: string): Promise<GetOnePostResponse> {
    return this.postsService.getOne(id);
  }

  @Post('/')
  addPost(@Body() post: AddPostDto): Promise<AddPostResponse> {
    return this.postsService.add(post);
  }

  @Patch('/:id')
  updatePost(
    @Body() updatedPost: UpdatePostDto,
    @Param('id') id: string,
  ): Promise<UpdatePostResponse> {
    return this.postsService.update(id, updatedPost);
  }

  @Delete('/:id')
  deletePost(
    @Body() updatedPost: DeletePostDto,
    @Param('id') id: string,
  ): Promise<DeletePostResponse> {
    return this.postsService.delete(id, updatedPost);
  }
}
