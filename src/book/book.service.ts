import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schemas';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();

    return books;
  }

  async findOne(bookId: string | undefined): Promise<Book | undefined> {
    const book = await this.bookModel.findOne({ id: bookId });

    return book ?? undefined;
  }

  async create(book: Book | undefined): Promise<Book | undefined> {
    try {
      const result = await this.bookModel.create(book);

      return result ?? undefined;
    } catch (error) {
      throw new Error(error)
    }
  }

  //   create(book: Partial<Book>): Book | undefined {
  //     const bookId = (books.length + 1).toString();
  //     const newBook = {
  //       id: bookId,
  //       title: book.title ?? '',
  //       author: book.author ?? '',
  //       genre: book.genre ?? '',
  //       publishedYear: book.publishedYear ?? 0,
  //       price: book.price ?? 0,
  //       inStock: book.inStock ?? false,
  //     };
  //     books.push(newBook);
  //     return newBook;
  //   }

  //   update(book: Partial<Book>, bookId: string) {
  //     const currentBook = books.find((book) => book.id === bookId);

  //     const updatedBook = {
  //       id: bookId,
  //       title: book.title ?? currentBook?.title,
  //       author: book.author ?? currentBook?.author,
  //       genre: book.genre ?? currentBook?.genre,
  //       publishedYear: book.publishedYear ?? currentBook?.publishedYear,
  //       price: book.price ?? currentBook?.price,
  //       inStock: book.inStock ?? currentBook?.inStock,
  //     };

  //     books.map((book) => {
  //       if (book.id === bookId) {
  //         return updatedBook;
  //       } else {
  //         return book;
  //       }
  //     });

  //     return updatedBook;
  //   }
}
