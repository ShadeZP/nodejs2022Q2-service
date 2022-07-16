import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
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
