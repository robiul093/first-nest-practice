import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schemas';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get('/:id')
  async getSingleBook(
    @Param('id') id: string | undefined,
  ): Promise<Book | undefined> {
    return this.bookService.findOne(id);
  }

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book | undefined> {
    try {
      return this.bookService.create(createBookDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  //   @Put('/:id')
  //   updateBook(
  //     @Param('id') id: string,
  //     @Body() book: Partial<Book>,
  //   ): Partial<Book> | undefined {
  //     // return this.bookService.update(book, id);
  //   }
}
