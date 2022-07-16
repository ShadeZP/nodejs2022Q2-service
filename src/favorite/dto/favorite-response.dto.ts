import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class FavoriteResponseDto {
  @IsArray()
  @Type(() => Artist)
  artists: Artist[]; // favorite artists ids

  @IsArray()
  @Type(() => Album)
  albums: Album[]; // favorite albums ids

  @IsArray()
  @Type(() => Track)
  tracks: Track[]; // favorite tracks ids
}
