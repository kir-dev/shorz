import { Expose } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PollType } from '../schemas/poll.schema';
import { ObjectId } from 'mongoose';

export class CreatePollDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @Expose()
  enabled: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @Expose()
  confidential: boolean;

  @IsString()
  @IsNotEmpty()
  @Expose()
  question: string;

  @IsEnum(PollType)
  @IsNotEmpty()
  @Expose()
  type: PollType;

  @IsString({ each: true })
  @Expose()
  answerOptions: string[];
}

export class PatchPollDto {
  @IsString()
  @IsOptional()
  @Expose()
  name: string;

  @IsBoolean()
  @IsOptional()
  @Expose()
  enabled: boolean;

  @IsString()
  @IsOptional()
  @Expose()
  question: string;

  @IsString({ each: true })
  @IsOptional()
  @Expose()
  answerOptions: string[];
}

type Poll = {
  _id: ObjectId;
  name: string;
  enabled: boolean;
  confidential: boolean;
  question: string;
  type: PollType;
  answerOptions: string[];
};

export type PollWithSubmissions = Poll & { submissions: Submission[] };

export enum SubmissionAnswerValue {
  NO,
  MAYBE,
  YES,
}

type SubmissionAnswer = { key: string; value: SubmissionAnswerValue };

type Submission = {
  _id: ObjectId;
  name: string;
  poll: string;
  answers: SubmissionAnswer[];
};

export type ConfidentialPollResult = {
  key: string;
} & { [K in SubmissionAnswerValue]: number };
