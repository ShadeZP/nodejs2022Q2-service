import { IsBoolean, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  name;

  @IsBoolean()
  grammy;
}
