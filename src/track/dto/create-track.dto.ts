import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  id;

  @IsString()
  name;

  @IsString()
  @IsOptional()
  artistId;

  @IsString()
  @IsOptional()
  albumId;

  @IsNumber()
  duration;
}
