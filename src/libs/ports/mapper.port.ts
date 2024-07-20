export interface MapperPort<Entity, Model> {
  toDomain: (entity: Model) => Entity;
  toPersistence: (entity: Entity) => Model;
}
