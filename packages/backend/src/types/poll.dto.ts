import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PollType } from '../schemas/poll.schema';

export class CreatePollDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsEnum(PollType)
  @IsNotEmpty()
  type: PollType;

  @IsString({ each: true })
  answerOptions: string[];
}

export class PatchPollDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  question: string;

  @IsString({ each: true })
  @IsOptional()
  answerOptions: string[];
}
