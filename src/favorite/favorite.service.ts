import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
  NotFoundException,
} from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
// import { AlbumDB, ArtistDB, FavoriteDB, TrackDB } from 'src/db/db';
import { Track } from 'src/track/entities/track.entity';
import { FavoriteResponseDto } from './dto/favorite-response.dto';
import { Favorite } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class FavoriteService implements OnModuleInit {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    private albumService: AlbumService,
  ) {}

  onModuleInit() {
    this._createInitFavorite();
  }

  mockId = 'mockId';
  async findAll(): Promise<Favorite> {
    // const albumEntities: Album[] = FavoriteDB.albums.map(
    //   (id) => AlbumDB.entities[id],
    // );
    // const artistEntities: Artist[] = FavoriteDB.artists.map(
    //   (id) => ArtistDB.entities[id],
    // );
    // const trackEntities: Track[] = FavoriteDB.tracks.map(
    //   (id) => TrackDB.entities[id],
    // );

    // const favoritesResponse: FavoriteResponseDto = {
    //   tracks: trackEntities,
    //   albums: albumEntities,
    //   artists: artistEntities,
    // };

    // return favoritesResponse;
    const res = await this.favoriteRepository.findOne({
      where: { id: this.mockId },
    });
    console.log('res', res);
    return res;
  }

  private async _createInitFavorite(): Promise<Favorite> {
    const res = await this.favoriteRepository.save({
      id: this.mockId,
      albums: [],
      artists: [],
      tracks: [],
    });
    console.log(res);
    return res;
  }

  // async addTrack(id: string): Promise<void> {
  //   const track = TrackDB.entities[id];

  //   if (!track) {
  //     throw new HttpException(
  //       `There is no track with id: ${id}`,
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }

  //   if (!FavoriteDB.tracks.includes(id)) {
  //     FavoriteDB.tracks.push(id);
  //   }
  // }

  // async removeTrack(id: string): Promise<void> {
  //   if (!FavoriteDB.tracks.includes(id)) {
  //     throw new NotFoundException(`There is no track with id: ${id}`);
  //   }

  //   FavoriteDB.tracks = FavoriteDB.tracks.filter((trackId) => trackId !== id);
  // }

  async addAlbum(id: string): Promise<void> {
    const album = await this.albumService.findOne(id);

    if (!album) {
      throw new HttpException(
        `There is no album with id: ${id}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    // if (!FavoriteDB.albums.includes(id)) {
    //   FavoriteDB.albums.push(id);
    // }

    const favorite = await this.findAll();
    this.favoriteRepository.create();
  }

  // async removeAlbum(id: string): Promise<void> {
  //   if (!FavoriteDB.albums.includes(id)) {
  //     throw new NotFoundException(`There is no albums with id: ${id}`);
  //   }

  //   FavoriteDB.albums = FavoriteDB.albums.filter((albumId) => albumId !== id);
  // }

  // async addArtist(id: string): Promise<void> {
  //   const artist = ArtistDB.entities[id];

  //   if (!artist) {
  //     throw new HttpException(
  //       `There is no artist with id: ${id}`,
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }

  //   if (!FavoriteDB.artists.includes(id)) {
  //     FavoriteDB.artists.push(id);
  //   }
  // }

  // async removeArtist(id: string): Promise<void> {
  //   if (!FavoriteDB.artists.includes(id)) {
  //     throw new NotFoundException(`There is no artist with id: ${id}`);
  //   }

  //   FavoriteDB.artists = FavoriteDB.artists.filter(
  //     (artistId) => artistId !== id,
  //   );
  // }
}
