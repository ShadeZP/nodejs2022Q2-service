import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AlbumService } from 'src/album/album.service';
import { Album } from 'src/album/entities/album.entity';
import { AlbumDB, ArtistDB } from 'src/db/db';
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

    return await addEntityToDB<Artist>(ArtistDB, artist);
  }

  async findAll(): Promise<Artist[]> {
    return await getAllFromDB<Artist>(ArtistDB);
  }

  async findOne(id: string): Promise<Artist> {
    const artist = ArtistDB.entities[id];

    if (!artist) {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    } else {
      return artist;
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = ArtistDB.entities[id];

    if (!artist) {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    } else {
      ArtistDB.entities[id] = {
        ...artist,
        ...updateArtistDto,
      };

      return ArtistDB.entities[id];
    }
  }

  async remove(id: string): Promise<void> {
    const artist = ArtistDB.entities[id];

    if (!artist) {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    } else {
      await removeEntityFromDB(ArtistDB, id);
      await this.removeArtistFromAlbum(id);
      return;
    }
  }

  async removeArtistFromAlbum(artistId: string): Promise<void> {
    const albums: Album[] = await await getAllFromDB<Album>(AlbumDB);
    const albumWithArtist: Album = albums.find(
      (album) => album.artistId === artistId,
    );

    if (albumWithArtist) {
      AlbumDB.entities[albumWithArtist.id].artistId = null;
    }
  }
}
