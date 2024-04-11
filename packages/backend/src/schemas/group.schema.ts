import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';
import { UserSchema } from './users.schema';

export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ type: Types.ObjectId, refPath: UserSchema })
  admin: Types.ObjectId;

  @Prop()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  memberIds: string[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
