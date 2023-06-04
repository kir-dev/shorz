import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { PollAnswer } from '../schemas/submission.schema';

export class CreateSubmissionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => PollAnswer)
  answers: PollAnswer[];
}
