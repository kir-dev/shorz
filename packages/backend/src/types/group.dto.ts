import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;
}

export class AddMembersDto {
  @IsString({ each: true })
  @Expose()
  @IsNotEmpty({ each: true })
  members: string[];
}
