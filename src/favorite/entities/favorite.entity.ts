import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('favorite')
export class Favorite {
  @PrimaryColumn()
  id: string;

  @OneToMany((type) => Artist, (artist) => artist.favorite)
  artists: Artist[]; // favorite artists ids

  @OneToMany((type) => Album, (album) => album.favorite)
  albums: Track[]; // favorite albums ids

  @OneToMany((type) => Track, (track) => track.favorite)
  tracks: Track[]; // favorite tracks ids
}
