import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { PollAnswer } from '../schemas/submission.schema';

export class CreateSubmissionDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Expose()
  @Type(() => PollAnswer)
  answers: PollAnswer[];
}
