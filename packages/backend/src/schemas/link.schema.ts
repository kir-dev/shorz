import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export type LinkDocument = HydratedDocument<Link>;

@Schema()
export class Link {
  @Prop()
  @IsString()
  @IsNotEmpty()
  name: string;
  @Prop()
  @IsString()
  @IsNotEmpty()
  shortId: string;
  @Prop()
  @IsString()
  @IsUrl({ host_whitelist: ['localhost'] })
  @IsNotEmpty()
  url: string;
  @Prop()
  @IsArray()
  timestamps: number[];
}

export const LinkSchema = SchemaFactory.createForClass(Link);
