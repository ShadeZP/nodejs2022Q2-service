// import { Album } from 'src/album/entities/album.entity';
// import { Artist } from 'src/artist/entities/artist.entity';
// import { Favorite } from 'src/favorite/entities/favorite.entity';
// import { EntityDB } from 'src/models/db.interface';
// import { Track } from 'src/track/entities/track.entity';
// import { User } from 'src/user/entities/user.entity';

// export const ArtistDB: EntityDB<Artist> = {
//   ids: [
//     '0a35dd62-e09f-444b-a628-f4e7c6954f55',
//     '0a35dd62-e09f-444b-a628-f4e7c6954f54',
//   ],
//   entities: {
//     '0a35dd62-e09f-444b-a628-f4e7c6954f55': {
//       id: '0a35dd62-e09f-444b-a628-f4e7c6954f55',
//       name: 'asd',
//       grammy: false,
//     },
//     '0a35dd62-e09f-444b-a628-f4e7c6954f54': {
//       id: '0a35dd62-e09f-444b-a628-f4e7c6954f54',
//       name: 'dsa',
//       grammy: true,
//     },
//   },
// };

// export const AlbumDB: EntityDB<Album> = {
//   ids: [
//     '0a35dd62-e09f-444b-a628-f4e7c6954f56',
//     '0a35dd62-e09f-444b-a628-f4e7c6954f58',
//   ],
//   entities: {
//     '0a35dd62-e09f-444b-a628-f4e7c6954f56': {
//       id: '0a35dd62-e09f-444b-a628-f4e7c6954f56',
//       name: 'asdfgdfg',
//       year: 1990,
//       artistId: '0a35dd62-e09f-444b-a628-f4e7c6954f55',
//     },
//     '0a35dd62-e09f-444b-a628-f4e7c6954f58': {
//       id: '0a35dd62-e09f-444b-a628-f4e7c6954f56',
//       name: 'asdfgdfg',
//       year: 1980,
//       artistId: null,
//     },
//   },
// };

// export const TrackDB: EntityDB<Track> = {
//   ids: [
//     '0a35dd62-e09f-444b-a628-f4e7c6954f46',
//     '0a35dd62-e09f-444b-a628-f4e7c6954f56',
//   ],
//   entities: {
//     '0a35dd62-e09f-444b-a628-f4e7c6954f46': {
//       id: '0a35dd62-e09f-444b-a628-f4e7c6954f46',
//       name: 'dasd',
//       artistId: null,
//       albumId: 'null',
//       duration: 180,
//     },
//     '0a35dd62-e09f-444b-a628-f4e7c6954f56': {
//       id: '0a35dd62-e09f-444b-a628-f4e7c6954f56',
//       name: 'werwer',
//       artistId: '0a35dd62-e09f-444b-a628-f4e7c6954f55',
//       albumId: '0a35dd62-e09f-444b-a628-f4e7c6954f56',
//       duration: 90,
//     },
//   },
// };

// export const FavoriteDB: Favorite = {
//   artists: ['0a35dd62-e09f-444b-a628-f4e7c6954f55'],
//   tracks: ['0a35dd62-e09f-444b-a628-f4e7c6954f46'],
//   albums: ['0a35dd62-e09f-444b-a628-f4e7c6954f56'],
// };

// export const UserDB: EntityDB<User> = {
//   ids: [],
//   entities: {},
// };
