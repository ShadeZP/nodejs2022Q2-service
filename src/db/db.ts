import { Artist } from 'src/artist/entities/artist.entity';
import { entitiesDB } from 'src/models/db.interface';

export const ArtistsDB: entitiesDB<Artist> = {
  ids: [
    '0a35dd62-e09f-444b-a628-f4e7c6954f55',
    '0a35dd62-e09f-444b-a628-f4e7c6954f54',
  ],
  entities: {
    '0a35dd62-e09f-444b-a628-f4e7c6954f55': {
      id: '0a35dd62-e09f-444b-a628-f4e7c6954f55',
      name: 'asd',
      grammy: false,
    },
    '0a35dd62-e09f-444b-a628-f4e7c6954f54': {
      id: '0a35dd62-e09f-444b-a628-f4e7c6954f54',
      name: 'dsa',
      grammy: true,
    },
  },
};
