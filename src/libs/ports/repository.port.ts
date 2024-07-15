import { Option } from 'oxide.ts';

export interface RepositoryPort<Entity> {
  save(entity: Entity | Entity[]): Promise<void>;

  findOneById(id: string): Promise<Option<Entity>>;

  delete(entity: Entity): Promise<boolean>;

  transaction<T>(handler: () => Promise<T>): Promise<T>;
}
