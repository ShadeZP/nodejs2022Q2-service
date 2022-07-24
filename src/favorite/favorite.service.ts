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
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class FavoriteService implements OnModuleInit {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    private albumService: AlbumService,
    private trackService: TrackService,
    private artistService: ArtistService,
  ) {}

  onModuleInit() {
    this._createInitFavorite();
  }

  mockId = 'mockId';
  async findAll(): Promise<Favorite> {
    const res = await this.favoriteRepository.findOne({
      where: { id: this.mockId },
      relations: {
        albums: true,
        artists: true,
        tracks: true,
      },
    });

    return res;
  }

  async addTrack(id: string): Promise<void> {
    const track = await this.trackService.findOne(id);

    if (!track) {
      throw new HttpException(
        `There is no track with id: ${id}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorite = await this.findAll();
    favorite.tracks = [...favorite.tracks, track];
    await this.favoriteRepository.save(favorite);
  }

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

    const favorite = await this.findAll();
    favorite.albums = [...favorite.albums, album];
    await this.favoriteRepository.save(favorite);
  }

  // async removeAlbum(id: string): Promise<void> {
  //   if (!FavoriteDB.albums.includes(id)) {
  //     throw new NotFoundException(`There is no albums with id: ${id}`);
  //   }

  //   FavoriteDB.albums = FavoriteDB.albums.filter((albumId) => albumId !== id);
  // }

  async addArtist(id: string): Promise<void> {
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new HttpException(
        `There is no artist with id: ${id}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorite = await this.findAll();
    favorite.artists = [...favorite.artists, artist];
    await this.favoriteRepository.save(favorite);
  }

  // async removeArtist(id: string): Promise<void> {
  //   if (!FavoriteDB.artists.includes(id)) {
  //     throw new NotFoundException(`There is no artist with id: ${id}`);
  //   }

  //   FavoriteDB.artists = FavoriteDB.artists.filter(
  //     (artistId) => artistId !== id,
  //   );
  // }

  private async _createInitFavorite(): Promise<Favorite> {
    return await this.favoriteRepository.save({
      id: this.mockId,
      albums: [],
      artists: [],
      tracks: [],
    });
  }
}
