import { IsBoolean, IsNotEmpty } from 'class-validator';

export class SetAdminDto {
  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;
}
