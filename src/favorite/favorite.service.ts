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
    let track: Track;

    try {
      track = await this.trackService.findOne(id);
    } catch {
      throw new HttpException(
        `There is no track with id: ${id}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorite = await this.findAll();
    favorite.tracks = [...favorite.tracks, track];

    await this.favoriteRepository.save(favorite);
  }

  async removeTrack(id: string): Promise<void> {
    const favorite = await this.findAll();
    const track = favorite.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`There is no track with id: ${id}`);
    }

    favorite.tracks = favorite.tracks.filter((track) => track.id !== id);
    await this.favoriteRepository.save(favorite);
  }

  async addAlbum(id: string): Promise<void> {
    let album: Album;
    try {
      album = await this.albumService.findOne(id);
    } catch {
      throw new HttpException(
        `There is no album with id: ${id}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorite = await this.findAll();
    favorite.albums = [...favorite.albums, album];

    await this.favoriteRepository.save(favorite);
  }

  async removeAlbum(id: string): Promise<void> {
    const favorite = await this.findAll();
    const album = favorite.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException(`There is no albums with id: ${id}`);
    }

    favorite.albums = favorite.albums.filter((album) => album.id !== id);
    await this.favoriteRepository.save(favorite);
  }

  async addArtist(id: string): Promise<void> {
    let artist: Artist;
    try {
      artist = await this.artistService.findOne(id);
    } catch {
      throw new HttpException(
        `There is no artist with id: ${id}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorite = await this.findAll();
    favorite.artists = [...favorite.artists, artist];

    await this.favoriteRepository.save(favorite);
  }

  async removeArtist(id: string): Promise<void> {
    const favorite = await this.findAll();
    const artist = favorite.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    }

    favorite.artists = favorite.artists.filter((artist) => artist.id !== id);
    await this.favoriteRepository.save(favorite);
  }

  private async _createInitFavorite(): Promise<Favorite> {
    return await this.favoriteRepository.save({
      id: this.mockId,
      albums: [],
      artists: [],
      tracks: [],
    });
  }
}
