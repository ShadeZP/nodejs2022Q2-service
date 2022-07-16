import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AlbumDB, FavoriteDB, TrackDB } from 'src/db/db';
import { Track } from 'src/track/entities/track.entity';
import { addEntityToDB } from 'src/utils/add-entity';
import { getAllFromDB } from 'src/utils/get-all-entities';
import { removeEntityFromDB } from 'src/utils/remove-entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  async create(createAlbumDto: CreateAlbumDto) {
    const album = {
      id: randomUUID(),
      ...createAlbumDto,
    };

    return await addEntityToDB<Album>(AlbumDB, album);
  }

  async findAll() {
    return await getAllFromDB<Album>(AlbumDB);
  }

  async findOne(id: string) {
    const album = AlbumDB.entities[id];
    if (!album) {
      throw new NotFoundException(`There is no album with id: ${id}`);
    } else {
      return album;
    }
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = AlbumDB.entities[id];

    if (!album) {
      throw new NotFoundException(`There is no album with id: ${id}`);
    } else {
      AlbumDB.entities[id] = {
        ...album,
        ...updateAlbumDto,
      };

      return AlbumDB.entities[id];
    }
  }

  async remove(id: string): Promise<void> {
    const album = AlbumDB.entities[id];

    if (!album) {
      throw new NotFoundException(`There is no album with id: ${id}`);
    } else {
      await removeEntityFromDB(AlbumDB, id);
      await this.removeAlbumFromFavorites(id);
      await this.removeAlbumFromTrack(id);
    }
  }

  async removeAlbumFromFavorites(albumId: string): Promise<void> {
    FavoriteDB.albums = FavoriteDB.albums.filter((id) => id !== albumId);
  }

  async removeAlbumFromTrack(id: string): Promise<void> {
    const tracks: Track[] = await getAllFromDB<Track>(TrackDB);
    const trackWithAlbum: Track = tracks.find((track) => track.albumId === id);

    if (trackWithAlbum) {
      TrackDB.entities[trackWithAlbum.id].albumId = null;
    }
  }
}
