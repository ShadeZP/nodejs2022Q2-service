import { Album } from 'src/album/entities/album.entity';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Track } from 'src/track/entities/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
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

  @OneToOne((type) => Track, {
    onDelete: 'SET NULL',
  })
  track;

  @OneToOne((type) => Album, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  album;
}
