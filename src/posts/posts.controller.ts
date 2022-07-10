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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AddPostDto } from './dto/add-post.dto';
import {
  AddPostResponse,
  DeletePostResponse,
  GetAllPostsResponse,
  GetOnePostResponse,
  UpdatePostResponse,
} from '../types/post';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { MulterDiskUploadedFiles } from '../types/files';
import { multerStorage, storageDir } from '../utils/storage';

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
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'photo',
          maxCount: 1,
        },
      ],
      { storage: multerStorage(path.join(storageDir(), 'post-photos')) },
    ),
  )
  addPost(
    @Body() post: AddPostDto,
    @UploadedFiles() files: MulterDiskUploadedFiles,
  ): Promise<AddPostResponse> {
    return this.postsService.add(post, files);
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
