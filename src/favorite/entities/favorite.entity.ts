import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('favorite')
export class Favorite {
  @PrimaryColumn()
  id: string;

  @OneToMany((type) => Artist, () => Artist)
  artists: Artist[]; // favorite artists ids

  @OneToMany((type) => Album, () => Album)
  albums: Track[]; // favorite albums ids

  @OneToMany((type) => Track, () => Track)
  tracks: Track[]; // favorite tracks ids
}
