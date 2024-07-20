import { convertPropsToObject } from '@/libs/utils/convert-props-to-object.util';

/**
 * Represents the unique identifier for an aggregate in DDD (Domain-Driven Design).
 * This type alias enhances the readability of the code by explicitly stating that
 * certain strings are used as aggregate IDs.
 */
export type AggregateID = string;

/**
 * Defines the base properties that every entity in the domain should have.
 * This interface ensures that all entities have an identifier, a creation date,
 * and an update date, which are fundamental for tracking and managing entities
 * over time.
 */
export interface BaseEntityProps {
  id: AggregateID;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Describes the properties required to create a new entity instance.
 * This interface is generic, allowing for the inclusion of additional
 * properties (`props`) specific to the entity being created. Optional
 * properties for creation and update timestamps are provided to allow
 * flexibility in setting these values during instantiation.
 *
 * @template T - The type of the additional properties specific to the entity.
 */
export interface CreateEntityProps<T> {
  id: AggregateID;
  props: T;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class Entity<EntityProps> {
  protected readonly props: EntityProps;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  /**
   * Constructs an entity with the given properties and timestamps.
   * Validates the properties and sets the creation and update timestamps.
   *
   * @param {CreateEntityProps<EntityProps>} params - The creation parameters including ID, properties, and optional timestamps.
   */
  constructor({
    id,
    createdAt,
    updatedAt,
    props,
  }: CreateEntityProps<EntityProps>) {
    this.setId(id);
    this.validateProps(props);
    const now = new Date();
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;
    this.props = props;
    this.validate();
  }

  /**
   * The unique identifier for the entity. Must be implemented by subclasses to support various ID types.
   * For example, it could be a UUID for aggregate root,
   * and shortid / nanoid for child entities.
   */
  protected abstract _id: AggregateID;

  /**
   * Gets the entity's unique identifier.
   * @returns {AggregateID} The unique identifier.
   */
  get id(): AggregateID {
    return this._id;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  static isEntity(entity: unknown): entity is Entity<unknown> {
    return entity instanceof Entity;
  }

  /**
   * Checks if this entity is equal to another by comparing their IDs.
   * @param {Entity<EntityProps>} object - The entity to compare with.
   * @returns {boolean} True if the entities are equal, false otherwise.
   */
  public equals(object?: Entity<EntityProps>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return this.id ? this.id === object.id : false;
  }

  /**
   * Returns a copy of the entity's properties, including its unique identifier, creation, and update timestamps,
   * along with any additional properties specific to the entity. This method ensures the immutability of the entity's
   * properties by returning a frozen object.
   *
   * @returns {EntityProps & BaseEntityProps} A frozen object containing the entity's properties.
   */
  public getProps(): EntityProps & BaseEntityProps {
    const propsCopy = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...this.props,
    };
    return Object.freeze(propsCopy);
  }

  /**
   * Converts the entity, along with all its sub-entities or value objects, into a plain object with primitive types.
   * This method is particularly useful for logging or debugging purposes, where a simple object representation is needed.
   * It ensures the immutability of the returned object by freezing it.
   *
   * @returns {unknown} A frozen plain object representation of the entity.
   */
  public toObject(): unknown {
    const plainProps = convertPropsToObject(this.props);

    const result = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...plainProps,
    };
    return Object.freeze(result);
  }

  /**
   * Abstract method that must be implemented by subclasses to validate the entity's invariants.
   * This method is intended to be called before saving the entity to the database to ensure that
   * all business rules and constraints are respected.
   */
  public abstract validate(): void;

  /**
   * Sets the unique identifier of the entity. This method is private and is called within the constructor
   * to ensure that the entity's ID is properly initialized.
   *
   * @param {AggregateID} id - The unique identifier to be set for the entity.
   */
  private setId(id: AggregateID): void {
    this._id = id;
  }

  /**
   * Validates the properties of the entity. This method is a placeholder for actual validation logic,
   * which should ensure that the properties meet certain criteria (e.g., not empty, of the correct type,
   * within a certain range, etc.). The commented-out code provides examples of potential validations.
   *
   * @param {EntityProps} props - The properties to validate.
   */
  private validateProps(props: EntityProps): void {
    // const MAX_PROPS = 50;
    //
    // if (Guard.isEmpty(props)) {
    //   throw new ArgumentNotProvidedException(
    //     'Entity props should not be empty',
    //   );
    // }
    // if (typeof props !== 'object') {
    //   throw new ArgumentInvalidException('Entity props should be an object');
    // }
    // if (Object.keys(props as any).length > MAX_PROPS) {
    //   throw new ArgumentOutOfRangeException(
    //     `Entity props should not have more than ${MAX_PROPS} properties`,
    //   );
    // }
  }
}
