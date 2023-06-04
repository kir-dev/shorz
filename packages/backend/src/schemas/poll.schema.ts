import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './users.schema';

export type PollDocument = HydratedDocument<Poll>;

export enum PollType {
  SINGLE,
  MULTI,
  MULTI_WITH_MAYBE,
}

@Schema()
export class Poll {
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  question: string;

  @Prop({ required: true })
  @IsEnum(PollType)
  type: PollType;

  @Prop([String])
  @IsString({ each: true })
  answerOptions: string[];

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: User;
}

export const PollSchema = SchemaFactory.createForClass(Poll);
