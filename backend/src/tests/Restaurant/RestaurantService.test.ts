import { createRestaurantService } from '../../src/api/services/RestaurantService';
import * as RestaurantRepository from '../../src/api/repositories/RestaurantRepository';
import { Http2ServerResponse } from 'node:http2';
import { Restaurant } from '../../src/database/models';

describe('RestaurantService', async () => {
  const validPayload = await Restaurant.create( {
    id: 1,
    username: 'restaurant123',
    email: 'contact@restaurant.com',
    password: 'securepassword123',
    phone: '27000000000',
    address_id: null,
    has_service_tax: true,
    address: {
      street: "Rua Exemplo",
      number: "123",
      complement: "Apt 101",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
      postal_code: "01234-567"
    },
    canceled_at: null,
    created_at: new Date(), 
  });

  const existingRestaurant = {
    username: 'restaurant123',
    email: 'contact@restaurant.com',
  };

  beforeAll(() => {
    // Mocks para os métodos do repositório
    jest.spyOn(RestaurantRepository, 'findRestaurantByEmailOrUsername').mockResolvedValue(null); // Retorna null (não existe)
    jest.spyOn(RestaurantRepository, 'createRestaurant').mockResolvedValue({
      validPayload,
    });
  });

  afterAll(() => {
    jest.restoreAllMocks(); // Restaura os mocks após os testes
  });

  it('should throw an error if a restaurant with the same username or email already exists', async () => {
    // Mockando o comportamento para retornar um restaurante existente
    (RestaurantRepository.findRestaurantByEmailOrUsername as jest.Mock).mockResolvedValue(existingRestaurant);

    try {
      await createRestaurantService(validPayload);
    } catch (error: unknown) {
      if (error instanceof Http2ServerResponse) {
        expect(error.statusMessage).toBe('A restaurant with this username or email already exists.');
        expect(error.statusCode).toBe(400);
      } else {
        throw new Error('Expected error to be an instance of Error');
      }
    }

    expect(RestaurantRepository.findRestaurantByEmailOrUsername).toHaveBeenCalledWith('restaurant123', 'contact@restaurant.com');
    expect(RestaurantRepository.createRestaurant).not.toHaveBeenCalled();
  });

  it('should successfully create a restaurant if username and email are unique', async () => {
    // Mockando o comportamento para não encontrar um restaurante existente
    (RestaurantRepository.findRestaurantByEmailOrUsername as jest.Mock).mockResolvedValue(null);

    const result = await createRestaurantService(validPayload);

    expect(result.username).toBe('restaurant123');
    expect(result.email).toBe('contact@restaurant.com');
    expect(RestaurantRepository.findRestaurantByEmailOrUsername).toHaveBeenCalledWith('restaurant123', 'contact@restaurant.com');
    expect(RestaurantRepository.createRestaurant).toHaveBeenCalledWith(validPayload);
  });
});
