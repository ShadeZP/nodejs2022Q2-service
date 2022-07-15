import { entitiesDB } from 'src/models/db.interface';
import { Entity } from 'src/models/entity.interface';

export async function getAllFromDB<T extends Entity>(
  db: entitiesDB<T>,
): Promise<T[]> {
  return db.ids.reduce((arr, id) => [...arr, db.entities[id]], []);
}
