import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schemas';
import { CreateBookDto } from './dto/create-book.dto';
import { handleError } from 'src/common/utils/error.util';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks(@Query() query: ExpressQuery)//: Promise<Book[]> 
  {
    return this.bookService.findAll(query);
  }

  @Get('/:id')
  async getSingleBook(
    @Param('id') id: string | undefined,
  ): Promise<Book | undefined> {
    return this.bookService.findOne(id);
  }

  @Post()
  async createBook(
    @Body() createBookDto: CreateBookDto,
  ): Promise<Book | undefined> {
    try {
      return this.bookService.create(createBookDto);
    } catch (error) {
      console.log('Error =>', error);
      handleError(error);
    }
  }

  @Put('/:id')
  updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    try {
      return this.bookService.update(id, updateBookDto);
    } catch (error) {
      handleError(error);
    }
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.delete(id);
  }
}
