import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('track')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  // @Column({ nullable: true })
  // artistId: string; // refers to Artist

  // @Column({ nullable: true })
  // albumId: string; // refers to Album

  @OneToOne((type) => Artist)
  @JoinColumn()
  artist;

  @OneToOne((type) => Album)
  @JoinColumn()
  album;

  @Column()
  duration: number; // integer number

  @ManyToOne((type) => Favorite, (favorite) => favorite.tracks, {
    onDelete: 'SET NULL',
  })
  favorite;
}
