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
  GetOnePostResponse,
} from '../interfaces/post';
import { PostEntity } from './post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { User } from '../users/user.entity';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject(PostsService) private readonly postsService: PostsService,
  ) {}

  @Get('/')
  getAllPosts(@Query() user: PostEntity): Promise<PostEntity> {
    return this.postsService.getAll(user);
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
  updatePost(@Body() updatedPost: UpdatePostDto, @Param('id') id: string) {
    return this.postsService.update(id, updatedPost);
  }

  @Delete('/:id')
  deletePost(@Body() updatedPost: DeletePostDto, @Param('id') id: string) {
    return this.postsService.delete(id, updatedPost);
  }
}
