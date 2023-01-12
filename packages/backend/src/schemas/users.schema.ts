import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Link } from './link.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  authSchId: string;
  @Prop()
  displayName: string;
  @Prop()
  mail: string;
  @Prop()
  isAdmin: boolean;
  @Prop({ type: Types.ObjectId, refPath: Link.name })
  links: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
