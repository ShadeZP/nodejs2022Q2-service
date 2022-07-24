import { Injectable, NotFoundException } from '@nestjs/common';
// import { AlbumDB } from 'src/db/db';
import { getAllFromDB } from 'src/utils/get-all-entities';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistService } from 'src/artist/artist.service';
import { Artist } from 'src/artist/entities/artist.entity';
@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    private artistService: ArtistService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const { artistId } = createAlbumDto;
    const album: Album | CreateAlbumDto = createAlbumDto;

    if (artistId) {
      const artist: Artist = await this.artistService.findOne(artistId);

      if (!artist) {
        throw new NotFoundException(`There is no artist with id: ${artistId}`);
      }

      Object.assign(album, { artist });
    }

    return await this.albumRepository.save(album);
  }

  async findAll(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id: id } });

    if (!album) {
      throw new NotFoundException(`There is no album with id: ${id}`);
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id: id } });

    if (!album) {
      throw new NotFoundException(`There is no album with id: ${id}`);
    }

    const { artistId } = updateAlbumDto;
    if (artistId) {
      const artist: Artist = await this.artistService.findOne(artistId);

      if (!artist) {
        throw new NotFoundException(`There is no artist with id: ${artistId}`);
      }

      Object.assign(album, { artist });
    }

    Object.assign(album, updateAlbumDto);

    return await this.albumRepository.save(album);
  }

  async remove(id: string): Promise<void> {
    // const album = AlbumDB.entities[id];
    // if (!album) {
    //   throw new NotFoundException(`There is no album with id: ${id}`);
    // } else {
    //   await removeEntityFromDB(AlbumDB, id);
    //   await this.removeAlbumFromFavorites(id);
    //   await this.removeAlbumFromTrack(id);
    // }

    const result = await this.albumRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`There is no album with id: ${id}`);
    }
  }

  // async removeAlbumFromFavorites(albumId: string): Promise<void> {
  //   FavoriteDB.albums = FavoriteDB.albums.filter((id) => id !== albumId);
  // }

  // async removeAlbumFromTrack(id: string): Promise<void> {
  //   const tracks: Track[] = await getAllFromDB<Track>(TrackDB);
  //   const trackWithAlbum: Track = tracks.find((track) => track.albumId === id);

  //   if (trackWithAlbum) {
  //     TrackDB.entities[trackWithAlbum.id].albumId = null;
  //   }
  // }
}
