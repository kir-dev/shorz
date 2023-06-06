import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';
import { LinkSchema } from './link.schema';
import { Poll } from './poll.schema';

export type SubmissionDocument = HydratedDocument<Submission>;

enum PollAnswerValue {
  NO,
  MAYBE,
  YES,
}

export class PollAnswer {
  @IsString()
  @IsNotEmpty()
  @Expose()
  key: string;

  @IsEnum(PollAnswerValue)
  @Expose()
  value: PollAnswerValue;
}

@Schema()
export class Submission {
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ type: Types.ObjectId, refPath: LinkSchema })
  poll: Poll;

  @Prop()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PollAnswer)
  answers: PollAnswer[];
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
