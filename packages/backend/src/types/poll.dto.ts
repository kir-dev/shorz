import { Expose } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PollType } from '../schemas/poll.schema';

export class CreatePollDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @Expose()
  enabled: boolean;

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
