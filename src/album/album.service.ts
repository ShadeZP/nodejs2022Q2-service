import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AlbumDB } from 'src/db/db';
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

  async remove(id: string) {
    const album = AlbumDB.entities[id];

    if (!album) {
      throw new NotFoundException(`There is no album with id: ${id}`);
    } else {
      return await removeEntityFromDB(AlbumDB, id);
    }
  }
}
