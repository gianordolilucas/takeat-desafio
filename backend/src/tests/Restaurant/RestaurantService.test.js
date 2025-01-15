"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const RestaurantService_1 = require("../../src/api/services/RestaurantService");
const RestaurantRepository = __importStar(require("../../src/api/repositories/RestaurantRepository"));
const node_http2_1 = require("node:http2");
const models_1 = require("../../src/database/models");
describe('RestaurantService', () => __awaiter(void 0, void 0, void 0, function* () {
    const validPayload = yield models_1.Restaurant.create({
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
    it('should throw an error if a restaurant with the same username or email already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mockando o comportamento para retornar um restaurante existente
        RestaurantRepository.findRestaurantByEmailOrUsername.mockResolvedValue(existingRestaurant);
        try {
            yield (0, RestaurantService_1.createRestaurantService)(validPayload);
        }
        catch (error) {
            if (error instanceof node_http2_1.Http2ServerResponse) {
                expect(error.statusMessage).toBe('A restaurant with this username or email already exists.');
                expect(error.statusCode).toBe(400);
            }
            else {
                throw new Error('Expected error to be an instance of Error');
            }
        }
        expect(RestaurantRepository.findRestaurantByEmailOrUsername).toHaveBeenCalledWith('restaurant123', 'contact@restaurant.com');
        expect(RestaurantRepository.createRestaurant).not.toHaveBeenCalled();
    }));
    it('should successfully create a restaurant if username and email are unique', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mockando o comportamento para não encontrar um restaurante existente
        RestaurantRepository.findRestaurantByEmailOrUsername.mockResolvedValue(null);
        const result = yield (0, RestaurantService_1.createRestaurantService)(validPayload);
        expect(result.username).toBe('restaurant123');
        expect(result.email).toBe('contact@restaurant.com');
        expect(RestaurantRepository.findRestaurantByEmailOrUsername).toHaveBeenCalledWith('restaurant123', 'contact@restaurant.com');
        expect(RestaurantRepository.createRestaurant).toHaveBeenCalledWith(validPayload);
    }));
}));
//# sourceMappingURL=RestaurantService.test.js.map