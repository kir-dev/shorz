import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsString()
  @IsOptional()
  shortId: string | undefined;
}

export class PatchLinkDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  url: string;
}
