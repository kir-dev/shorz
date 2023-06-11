import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class SetAdminDto {
  @IsBoolean()
  @IsNotEmpty()
  @Expose()
  isAdmin: boolean;
}
