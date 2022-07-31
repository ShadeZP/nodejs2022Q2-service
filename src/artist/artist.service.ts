import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artistRepository.save(createArtistDto);
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOne({ where: { id: id } });

    if (!artist) {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.artistRepository.findOne({ where: { id: id } });

    if (!artist) {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    }

    const updatedArtist = {
      ...artist,
      ...updateArtistDto,
    };

    return await this.artistRepository.save(updatedArtist);
  }

  async remove(id: string): Promise<void> {
    // const artist = ArtistDB.entities[id];

    // if (!artist) {
    //   throw new NotFoundException(`There is no artist with id: ${id}`);
    // } else {
    //   await removeEntityFromDB(ArtistDB, id);
    //   await this.removeArtistFromFavorites(id);
    //   await this.removeArtistFromAlbum(id);
    //   await this.removeArtistFromTrack(id);
    //   return;
    // }

    const result = await this.artistRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    }
  }

  // async removeArtistFromAlbum(artistId: string): Promise<void> {
  //   const albums: Album[] = await getAllFromDB<Album>(AlbumDB);
  //   const albumWithArtist: Album = albums.find(
  //     (album) => album.artistId === artistId,
  //   );

  //   if (albumWithArtist) {
  //     AlbumDB.entities[albumWithArtist.id].artistId = null;
  //   }
  // }

  // async removeArtistFromFavorites(artistId: string): Promise<void> {
  //   FavoriteDB.artists = FavoriteDB.artists.filter((id) => id !== artistId);
  // }

  // async removeArtistFromTrack(id: string): Promise<void> {
  //   const tracks: Track[] = await getAllFromDB<Track>(TrackDB);
  //   const trackWithArtist: Track = tracks.find(
  //     (track) => track.artistId === id,
  //   );

  //   if (trackWithArtist) {
  //     TrackDB.entities[trackWithArtist.id].artistId = null;
  //   }
  // }
}
