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

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  // @Column({ nullable: true })
  // artistId: string; // refers to Artist

  @OneToOne((type) => Artist)
  @JoinColumn()
  artist;

  @ManyToOne((type) => Favorite, (favorite) => favorite.tracks, {
    onDelete: 'SET NULL',
  })
  favorite;
}
