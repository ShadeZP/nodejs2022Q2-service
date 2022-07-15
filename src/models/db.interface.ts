export interface entitiesDB<T> {
  ids: string[];
  entities: {
    [key: string]: T;
  };
}
