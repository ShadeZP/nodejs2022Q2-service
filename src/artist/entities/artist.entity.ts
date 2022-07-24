import { Album } from 'src/album/entities/album.entity';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Track } from 'src/track/entities/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artist')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;

  @ManyToOne((type) => Favorite, (favorite) => favorite.tracks, {
    onDelete: 'SET NULL',
  })
  favorite;

  @OneToMany((type) => Track, (track) => track.artist, {
    onDelete: 'SET NULL',
  })
  tracks;

  @OneToMany((type) => Album, (album) => album.artist, {
    onDelete: 'SET NULL',
  })
  albums;
}
