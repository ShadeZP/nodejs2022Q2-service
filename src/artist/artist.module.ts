import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumService } from 'src/album/album.service';

@Module({
  controllers: [ArtistController],
  imports: [AlbumService],
  providers: [ArtistService],
})
export class ArtistModule {}
