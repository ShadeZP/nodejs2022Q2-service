import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ArtistsDB } from 'src/db/db';
import { addEntityToDB } from 'src/utils/add-entity';
import { getAllFromDB } from 'src/utils/get-all-entities';
import { removeEntityFromDB } from 'src/utils/remove-entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = {
      id: randomUUID(),
      ...createArtistDto,
    };

    return await addEntityToDB<Artist>(ArtistsDB, artist);
  }

  async findAll(): Promise<Artist[]> {
    return await getAllFromDB<Artist>(ArtistsDB);
  }

  async findOne(id: string): Promise<Artist> {
    const artist = ArtistsDB.entities[id];
    if (!artist) {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    } else {
      return artist;
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    console.log('updateArtistDto', updateArtistDto);
    const artist = ArtistsDB.entities[id];

    if (!artist) {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    } else {
      ArtistsDB.entities[id] = {
        ...artist,
        ...updateArtistDto,
      };

      return ArtistsDB.entities[id];
    }
  }

  async remove(id: string): Promise<void> {
    const artist = ArtistsDB.entities[id];

    if (!artist) {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    } else {
      return await removeEntityFromDB(ArtistsDB, id);
    }
  }
}
