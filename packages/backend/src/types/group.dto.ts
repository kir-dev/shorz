import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Group } from '../schemas/group.schema';
import { PollDocument } from '../schemas/poll.schema';
import { UserDocument } from '../schemas/users.schema';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;
}

export class AddMemberDto {
  @IsString()
  @Expose()
  @IsNotEmpty()
  memberMail: string;
}

export class RemoveMemberDto {
  @IsString()
  @Expose()
  @IsNotEmpty()
  memberId: string;
}

export class GroupDto implements Pick<Group, 'name'> {
  @Expose()
  name: string;

  @Expose()
  isAdmin: boolean;

  @Expose()
  polls: PollDocument[];

  @Expose()
  members: UserDocument[];
}
