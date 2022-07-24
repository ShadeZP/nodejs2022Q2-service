import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('favorite')
export class Favorite {
  @PrimaryColumn()
  id: string;

  @OneToMany((type) => Artist, (artist) => artist.favorite)
  @JoinColumn({ name: 'artists' })
  artists: Artist[]; // favorite artists ids

  @OneToMany((type) => Album, (album) => album.favorite)
  @JoinColumn({ name: 'albums' })
  albums: Album[]; // favorite albums ids

  @OneToMany((type) => Track, (track) => track.favorite)
  @JoinColumn({ name: 'tracks' })
  tracks: Track[]; // favorite tracks ids
}
