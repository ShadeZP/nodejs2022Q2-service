import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TrackDB } from 'src/db/db';
import { addEntityToDB } from 'src/utils/add-entity';
import { getAllFromDB } from 'src/utils/get-all-entities';
import { removeEntityFromDB } from 'src/utils/remove-entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  async create(createTrackDto: CreateTrackDto) {
    const track = {
      id: randomUUID(),
      ...createTrackDto,
    };

    return await addEntityToDB<Track>(TrackDB, track);
  }

  async findAll() {
    return await getAllFromDB<Track>(TrackDB);
  }

  async findOne(id: string) {
    const track = TrackDB.entities[id];

    if (!track) {
      throw new NotFoundException(`There is no track with id: ${id}`);
    } else {
      return track;
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = TrackDB.entities[id];

    if (!track) {
      throw new NotFoundException(`There is no track with id: ${id}`);
    } else {
      TrackDB.entities[id] = {
        ...track,
        ...updateTrackDto,
      };

      return TrackDB.entities[id];
    }
  }

  async remove(id: string) {
    const track = TrackDB.entities[id];

    if (!track) {
      throw new NotFoundException(`There is no track with id: ${id}`);
    } else {
      return removeEntityFromDB(TrackDB, id);
    }
  }
}
