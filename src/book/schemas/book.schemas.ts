import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Book {

  @Prop({ required: true, unique: true},)
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  author: string;

  @Prop({required: true})
  price: number;

  @Prop({required: true})
  genre: string;

  @Prop({required: true})
  publishedYear: number;

  @Prop({required: true})
  inStock: boolean;
};

export const BookSchema = SchemaFactory.createForClass(Book);
