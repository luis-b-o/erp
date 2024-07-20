// import { Option } from 'oxide.ts';

export interface RepositoryPort<Entity> {
  save(entity: Entity): Promise<void>;

  // transaction<T>(handler: () => Promise<T>): Promise<T>;
}
