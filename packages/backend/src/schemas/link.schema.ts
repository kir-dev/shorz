import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LinkDocument = HydratedDocument<Link>;

@Schema()
export class Link {
  @Prop()
  name: string;
  @Prop()
  shortId: string;
  @Prop()
  url: string;
  @Prop()
  timestamps: number[];
}

export const LinkSchema = SchemaFactory.createForClass(Link);
