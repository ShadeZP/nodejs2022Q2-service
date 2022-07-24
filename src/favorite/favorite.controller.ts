import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  // @Post('track/:id')
  // @HttpCode(HttpStatus.CREATED)
  // addTrack(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.favoriteService.addTrack(id);
  // }

  // @Delete('track/:id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // removeTrack(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.favoriteService.removeTrack(id);
  // }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.addAlbum(id);
  }

  // @Delete('album/:id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.favoriteService.removeAlbum(id);
  // }

  // @Post('artist/:id')
  // @HttpCode(HttpStatus.CREATED)
  // addArtist(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.favoriteService.addArtist(id);
  // }

  // @Delete('artist/:id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // removeArtist(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.favoriteService.removeArtist(id);
  // }
}
