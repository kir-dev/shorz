import { Expose } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;
}

export class AddMembersDto {
  @IsString({ each: true })
  @IsArray()
  @Expose()
  @IsNotEmpty({ each: true })
  members: string[];
}
