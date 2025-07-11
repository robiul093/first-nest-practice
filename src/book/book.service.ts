import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schemas';
import { CreateBookDto } from './dto/create-book.dto';
import { handleError } from 'src/common/utils/error.util';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<Book>,
  ) {}

  async findAll(query: Query)//: Promise<Book[]> 
  {
    const itemPrePage = 4;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * itemPrePage;
    console.log(query, page, skip)

    const search = query.searchTerm
      ? {
          $or: [
            { title: { $regex: query.searchTerm, $options: 'i' } },
            { description: { $regex: query.searchTerm, $options: 'i' } },
            { author: { $regex: query.searchTerm, $options: 'i' } },
            { genre: { $regex: query.searchTerm, $options: 'i' } },
          ],
        }
      : {};

    const books = await this.bookModel
      .find({ ...search })
      .limit(itemPrePage)
      .skip(skip);
      
      return {
        total: books.length,
        page: page,
        limit: itemPrePage,
        books
    };
  }

  async findOne(bookId: string | undefined): Promise<Book | undefined> {
    const book = await this.bookModel.findOne({ id: bookId });

    if (!book) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }

    return book ?? undefined;
  }

  async create(
    createBookDto: CreateBookDto | undefined,
  ): Promise<Book | undefined> {
    try {
      const allBooks = await this.bookModel.find();
      const id = (allBooks.length + 1).toString();
      const newBook = { id, ...createBookDto };

      const result = await this.bookModel.create(newBook);

      return result ?? undefined;
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: string | undefined, updateBookDto: UpdateBookDto) {
    const updatedBook = await this.bookModel.updateOne({ id }, updateBookDto, {
      new: true,
      runValidators: true,
    });

    return updatedBook;
  }

  async delete(id: string) {
    try {
      const findBook = await this.bookModel.findOne({ id });
      if (!findBook)
        throw new NotFoundException(`Book with id ${id} not found`);

      const result = await this.bookModel.deleteOne({ id });
      if (result.acknowledged && result.deletedCount) {
        return {
          message: 'Book Deleted Successfully',
          deletedCount: result?.deletedCount,
        };
      }
    } catch (error) {
      handleError(error);
    }
  }
}
