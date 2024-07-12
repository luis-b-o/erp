import { convertPropsToObject } from '@/libs/utils/convert-props-to-object.util';

/**
 * Defines the primitive types that can be used within a DomainPrimitive.
 *
 * This type is used to restrict the values that can be assigned to a DomainPrimitive,
 * ensuring they are only of primitive data types (string, number, boolean) or a Date object.
 */
export type Primitives = string | number | boolean;

/**
 * Represents a domain primitive in the domain-driven design context.
 *
 * A domain primitive encapsulates a value that has domain-specific meaning and validation.
 * This interface ensures that the value adheres to the constraints defined by the `Primitives`
 * type or is a `Date` object, providing a strong type for domain values.
 *
 * @template T - The type of the value encapsulated by the domain primitive. Must be one of the
 *               allowed primitive types or a `Date`.
 */
export interface DomainPrimitive<T extends Primitives | Date> {
  value: T;
}

/**
 * Defines the type for the properties of a ValueObject.
 *
 * This conditional type checks if `T` extends `Primitives` or `Date`, and if so, it uses
 * `DomainPrimitive<T>` to ensure the value adheres to the domain primitive constraints.
 * Otherwise, it allows `T` as is, supporting more complex structures beyond primitives and Date.
 * It's a utility type aimed at providing flexibility in defining value objects while ensuring
 * type safety and adherence to domain-driven design principles.
 *
 * @template T - The type of the value or object encapsulated by the ValueObject. It can be a
 *               primitive type, a `Date`, or any other type.
 */
type ValueObjectProps<T> = T extends Primitives | Date ? DomainPrimitive<T> : T;

/**
 * Abstract class representing a Value Object in Domain-Driven Design.
 *
 * Value Objects are objects that we determine their equality through their structural property values
 * rather than through a unique identity. This class provides a base implementation for such objects,
 * including methods for equality checks, unpacking properties, and validation.
 *
 * @template T - The type of the properties encapsulated by the ValueObject. This can be a primitive type,
 * a `Date`, or any other type that conforms to the constraints defined by `ValueObjectProps<T>`.
 */
export abstract class ValueObject<T> {
  protected readonly props: ValueObjectProps<T>;

  protected constructor(props: ValueObjectProps<T>) {
    this.checkIfEmpty(props);
    this.validate(props);
    this.props = props;
  }

  static isValueObject(obj: unknown): obj is ValueObject<unknown> {
    return obj instanceof ValueObject;
  }

  /**
   * Checks if two ValueObjects are equal by comparing their structural properties.
   *
   * @param vo - The ValueObject to compare with the current instance.
   * @returns `true` if the two ValueObjects are equal, otherwise `false`.
   */
  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    return JSON.stringify(this) === JSON.stringify(vo);
  }

  /**
   * Unpacks the ValueObject to get its raw properties. If the properties are a DomainPrimitive,
   * it returns the value of the DomainPrimitive. Otherwise, it returns a copy of the properties.
   *
   * @returns The raw properties of the ValueObject.
   */
  public unpack(): T {
    if (this.isDomainPrimitive(this.props)) {
      return this.props.value;
    }

    const propsCopy = convertPropsToObject(this.props);

    return Object.freeze(propsCopy);
  }

  /**
   * Abstract method to validate the properties of the ValueObject. Implementations should throw
   * an error if the properties are invalid.
   *
   * @param props - The properties to validate.
   */
  protected abstract validate(props: ValueObjectProps<T>): void;

  /**
   * Checks if the provided properties are empty. If so, it throws an error. This method is intended
   * to be implemented with a validation library or custom logic.
   *
   * @param props - The properties to check.
   */
  private checkIfEmpty(props: ValueObjectProps<T>): void {
    // if (
    //   Guard.isEmpty(props) ||
    //   (this.isDomainPrimitive(props) && Guard.isEmpty(props.value))
    // ) {
    //   throw new ArgumentNotProvidedException('Property cannot be empty');
    // }
  }

  /**
   * Checks if the provided object is a DomainPrimitive.
   *
   * This method verifies if the given object has a 'value' property, which is a characteristic
   * of a DomainPrimitive. It's a type guard function that allows TypeScript to understand
   * more about the type of the object within a conditional block.
   *
   * @param obj - The object to check. Its type is unknown, which means it can be anything.
   * @returns A boolean value that indicates whether the object is a DomainPrimitive. The return
   *          type also acts as a type predicate, `obj is DomainPrimitive<T & (Primitives | Date)>`,
   *          allowing TypeScript to narrow down the type of `obj` in the scope where this method
   *          is used based on the return value.
   */
  private isDomainPrimitive(
    obj: unknown,
  ): obj is DomainPrimitive<T & (Primitives | Date)> {
    return !!Object.prototype.hasOwnProperty.call(obj, 'value');
  }
}
