import { ValidationError } from 'sequelize';
import { Restaurant, sequelize } from '../../src/database/models';

describe('Restaurant Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it('should throw an error when username is empty', async () => {
    try {
      await Restaurant.create({
        email: 'contact@restaurant.com',
        password: 'securepassword123',
        phone: '27000000000',
        address_id: null,
        has_service_tax: true,
        username: ''
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        expect(error.errors[0].message).toBe('Username is required');
      } else {
        throw error;
      }
    }
  });

  it('should throw an error when username is null', async () => {
    try {
      await Restaurant.create({
        email: 'contact@restaurant.com',
        password: 'securepassword123',
        phone: '27000000000',
        address_id: null,
        has_service_tax: true,
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        expect(error.errors[0].message).toBe('Restaurant.username cannot be null');
      } else {
        throw error;
      }
    }
  });

  it('should throw an error when email is empty', async () => {
    try {
      await Restaurant.create({
        username: 'restaurant123',
        password: 'securepassword123',
        phone: '27000000000',
        address_id: null,
        has_service_tax: true,
        email: '',
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        expect(error.errors[0].message).toBe('Email is required');
      } else {
        throw error;
      }
    }
  });

  it('should throw an error when email is null', async () => {
    try {
      await Restaurant.create({
        username: 'restaurant123',
        password: 'securepassword123',
        phone: '27000000000',
        address_id: null,
        has_service_tax: true,
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        expect(error.errors[0].message).toBe('Restaurant.email cannot be null');
      } else {
        throw error;
      }
    }
  });

  it('should throw an error when email is invalid', async () => {
    try {
      await Restaurant.create({
        username: 'restaurant123',
        email: 'invalid-email',
        password: 'securepassword123',
        phone: '27000000000',
        address_id: null,
        has_service_tax: true,
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        expect(error.errors[0].message).toBe('Email must be a valid email address');
      } else {
        throw error;
      }
    }
  });

  it('should throw an error when password is empty', async () => {
    try {
      await Restaurant.create({
        username: 'restaurant123',
        email: 'contact@restaurant.com',
        phone: '27000000000',
        address_id: null,
        has_service_tax: true,
        password: '',
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        expect(error.errors[0].message).toBe('Password is required');
      } else {
        throw error;
      }
    }
  });

  it('should throw an error when password is null', async () => {
    try {
      await Restaurant.create({
        username: 'restaurant123',
        email: 'contact@restaurant.com',
        phone: '27000000000',
        address_id: null,
        has_service_tax: true,
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        expect(error.errors[0].message).toBe('Restaurant.password cannot be null');
      } else {
        throw error;
      }
    }
  });

  it('should throw an error when password is less than 6 characters', async () => {
    try {
      await Restaurant.create({
        username: 'restaurant123',
        email: 'contact@restaurant.com',
        password: '12345',
        phone: '27000000000',
        address_id: null,
        has_service_tax: true,
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        expect(error.errors[0].message).toBe('Password must be at least 6 characters long');
      } else {
        throw error;
      }
    }
  });

  it('should throw an error when phone is empty', async () => {
    try {
      await Restaurant.create({
        username: 'restaurant123',
        email: 'contact@restaurant.com',
        password: 'securepassword123',
        address_id: null,
        has_service_tax: true,
        phone: '',
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        expect(error.errors[0].message).toBe('Phone is required');
      } else {
        throw error;
      }
    }
  });

  it('should throw an error when phone is null', async () => {
    try {
      await Restaurant.create({
        username: 'restaurant123',
        email: 'contact@restaurant.com',
        password: 'securepassword123',
        address_id: null,
        has_service_tax: true,
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        expect(error.errors[0].message).toBe('Restaurant.phone cannot be null');
      } else {
        throw error;
      }
    }
  });

  it('should throw an error when phone is invalid', async () => {
    try {
      await Restaurant.create({
        username: 'restaurant123',
        email: 'contact@restaurant.com',
        password: 'securepassword123',
        phone: '12345',
        address_id: null,
        has_service_tax: true,
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        expect(error.errors[0].message).toBe('Phone must be a valid phone number');
      } else {
        throw error;
      }
    }
  });

  it('should throw an error when has_service_tax is not a boolean', async () => {
    try {
      await Restaurant.create({
        username: 'restaurant123',
        email: 'contact@restaurant.com',
        password: 'securepassword123',
        phone: '27000000000',
        address_id: null,
        has_service_tax: 'yes', // Erro aqui
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        expect(error.errors[0].message).toBe('Has service tax must be a boolean');
      } else {
        throw error;
      }
    }
  });

  it('should allow address_id to be null', async () => {
    const restaurant = await Restaurant.create({
      username: 'restaurant123',
      email: 'contact@restaurant.com',
      password: 'securepassword123',
      phone: '27000000000',
      address_id: null,
      has_service_tax: true,
    });

    expect(restaurant.address_id).toBeNull();
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
