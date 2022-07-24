import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.trackRepository.save(createTrackDto);
  }

  async findAll(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.trackRepository.findOne({ where: { id: id } });

    if (!track) {
      throw new NotFoundException(`There is no track with id: ${id}`);
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.trackRepository.findOne({ where: { id: id } });

    if (!track) {
      throw new NotFoundException(`There is no track with id: ${id}`);
    }

    const updatedTrack = {
      ...track,
      ...updateTrackDto,
    };

    return await this.trackRepository.save(updatedTrack);
  }

  async remove(id: string) {
    // const track = TrackDB.entities[id];

    // if (!track) {
    //   throw new NotFoundException(`There is no track with id: ${id}`);
    // } else {
    //   await removeEntityFromDB(TrackDB, id);
    //   await this.removeTrackFromFavorites(id);
    // }

    const result = await this.trackRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`There is no track with id: ${id}`);
    }
  }

  // async removeTrackFromFavorites(trackId: string): Promise<void> {
  //   FavoriteDB.tracks = FavoriteDB.tracks.filter((id) => id !== trackId);
  // }
}
