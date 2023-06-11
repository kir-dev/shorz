import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl({ host_whitelist: ['localhost'] })
  @Expose()
  url: string;

  @IsString()
  @IsOptional()
  @Expose()
  shortId: string | undefined;
}

export class PatchLinkDto {
  @IsString()
  @IsOptional()
  @Expose()
  name: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  @Expose()
  url: string;
}
