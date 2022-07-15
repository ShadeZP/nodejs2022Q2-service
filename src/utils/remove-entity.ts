import { entitiesDB } from 'src/models/db.interface';
import { Entity } from 'src/models/entity.interface';

export async function removeEntityFromDB<T extends Entity>(
  db: entitiesDB<T>,
  id: string,
): Promise<void> {
  db.ids = db.ids.filter((item) => item !== id);
  delete db.entities[id];
}
