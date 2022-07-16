export interface EntityDB<T> {
  ids: string[];
  entities: {
    [key: string]: T;
  };
}
