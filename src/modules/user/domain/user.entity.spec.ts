import { Email } from '@/modules/shared/domain/value-objects/email.value-object';
import { UserEntity } from '@/modules/user/domain/user.entity';
import { CreateUserProps } from '@/modules/user/domain/user.types';

jest.mock('@/libs/application/context/AppRequestContext');

describe('UserEntity', () => {
  describe('create', () => {
    it('should successfully create a user entity with valid properties', () => {
      const createUserProps: CreateUserProps = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'securePassword123',
      };

      const user = UserEntity.create(createUserProps).getProps();

      expect(user.name).toBe(createUserProps.name);
      expect(user.email).toBeInstanceOf(Email);
      expect(user.active).toBeTruthy();
      expect(user.password).toBeFalsy();
    });

    // it('should throw an error for invalid email', () => {
    //   const createUserProps: CreateUserProps = {
    //     email: 'invalidEmail',
    //     name: 'Test User',
    //     password: 'securePassword123',
    //   };
    //
    //   expect(() => UserEntity.create(createUserProps)).toThrow('Invalid email');
    // });
    //
    // it('should emit UserCreatedDomainEvent on successful creation', () => {
    //   const createUserProps: CreateUserProps = {
    //     email: 'test@example.com',
    //     name: 'Test User',
    //     password: 'securePassword123',
    //   };
    //
    //   const user = UserEntity.create(createUserProps);
    //   const events = user['domainEvents'];
    //
    //   expect(events).toHaveLength(1);
    //   expect(events[0]).toBeInstanceOf(UserCreatedDomainEvent);
    //   expect(events[0].aggregateId).toBe(user.id);
    //   expect(events[0].name).toBe(createUserProps.name);
    // });
  });

  describe.skip('validate', () => {
    it('should validate user entity successfully with all required properties', () => {
      const createUserProps: CreateUserProps = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'securePassword123',
      };

      const user = UserEntity.create(createUserProps);

      expect(() => user.validate()).not.toThrow();
    });

    // Add more tests for specific validation rules as needed
  });
});
