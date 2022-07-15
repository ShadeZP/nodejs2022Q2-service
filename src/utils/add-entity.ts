import { entitiesDB } from 'src/models/db.interface';
import { Entity } from 'src/models/entity.interface';

export async function addEntityToDB<T extends Entity>(
  db: entitiesDB<T>,
  entity: T,
): Promise<T> {
  const { id } = entity;
  db.ids.push(id);
  db.entities[id] = entity;

  return entity;
}
