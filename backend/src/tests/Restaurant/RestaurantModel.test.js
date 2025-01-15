"use strict";
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
const sequelize_1 = require("sequelize");
const models_1 = require("../../src/database/models");
describe('Restaurant Model', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.sequelize.sync({ force: true });
    }));
    it('should throw an error when username is empty', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield models_1.Restaurant.create({
                email: 'contact@restaurant.com',
                password: 'securepassword123',
                phone: '27000000000',
                address_id: null,
                has_service_tax: true,
                username: ''
            });
        }
        catch (error) {
            if (error instanceof sequelize_1.ValidationError) {
                expect(error.errors[0].message).toBe('Username is required');
            }
            else {
                throw error;
            }
        }
    }));
    it('should throw an error when username is null', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield models_1.Restaurant.create({
                email: 'contact@restaurant.com',
                password: 'securepassword123',
                phone: '27000000000',
                address_id: null,
                has_service_tax: true,
            });
        }
        catch (error) {
            if (error instanceof sequelize_1.ValidationError) {
                expect(error.errors[0].message).toBe('Restaurant.username cannot be null');
            }
            else {
                throw error;
            }
        }
    }));
    it('should throw an error when email is empty', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield models_1.Restaurant.create({
                username: 'restaurant123',
                password: 'securepassword123',
                phone: '27000000000',
                address_id: null,
                has_service_tax: true,
                email: '',
            });
        }
        catch (error) {
            if (error instanceof sequelize_1.ValidationError) {
                expect(error.errors[0].message).toBe('Email is required');
            }
            else {
                throw error;
            }
        }
    }));
    it('should throw an error when email is null', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield models_1.Restaurant.create({
                username: 'restaurant123',
                password: 'securepassword123',
                phone: '27000000000',
                address_id: null,
                has_service_tax: true,
            });
        }
        catch (error) {
            if (error instanceof sequelize_1.ValidationError) {
                expect(error.errors[0].message).toBe('Restaurant.email cannot be null');
            }
            else {
                throw error;
            }
        }
    }));
    it('should throw an error when email is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield models_1.Restaurant.create({
                username: 'restaurant123',
                email: 'invalid-email',
                password: 'securepassword123',
                phone: '27000000000',
                address_id: null,
                has_service_tax: true,
            });
        }
        catch (error) {
            if (error instanceof sequelize_1.ValidationError) {
                expect(error.errors[0].message).toBe('Email must be a valid email address');
            }
            else {
                throw error;
            }
        }
    }));
    it('should throw an error when password is empty', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield models_1.Restaurant.create({
                username: 'restaurant123',
                email: 'contact@restaurant.com',
                phone: '27000000000',
                address_id: null,
                has_service_tax: true,
                password: '',
            });
        }
        catch (error) {
            if (error instanceof sequelize_1.ValidationError) {
                expect(error.errors[0].message).toBe('Password is required');
            }
            else {
                throw error;
            }
        }
    }));
    it('should throw an error when password is null', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield models_1.Restaurant.create({
                username: 'restaurant123',
                email: 'contact@restaurant.com',
                phone: '27000000000',
                address_id: null,
                has_service_tax: true,
            });
        }
        catch (error) {
            if (error instanceof sequelize_1.ValidationError) {
                expect(error.errors[0].message).toBe('Restaurant.password cannot be null');
            }
            else {
                throw error;
            }
        }
    }));
    it('should throw an error when password is less than 6 characters', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield models_1.Restaurant.create({
                username: 'restaurant123',
                email: 'contact@restaurant.com',
                password: '12345',
                phone: '27000000000',
                address_id: null,
                has_service_tax: true,
            });
        }
        catch (error) {
            if (error instanceof sequelize_1.ValidationError) {
                expect(error.errors[0].message).toBe('Password must be at least 6 characters long');
            }
            else {
                throw error;
            }
        }
    }));
    it('should throw an error when phone is empty', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield models_1.Restaurant.create({
                username: 'restaurant123',
                email: 'contact@restaurant.com',
                password: 'securepassword123',
                address_id: null,
                has_service_tax: true,
                phone: '',
            });
        }
        catch (error) {
            if (error instanceof sequelize_1.ValidationError) {
                expect(error.errors[0].message).toBe('Phone is required');
            }
            else {
                throw error;
            }
        }
    }));
    it('should throw an error when phone is null', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield models_1.Restaurant.create({
                username: 'restaurant123',
                email: 'contact@restaurant.com',
                password: 'securepassword123',
                address_id: null,
                has_service_tax: true,
            });
        }
        catch (error) {
            if (error instanceof sequelize_1.ValidationError) {
                expect(error.errors[0].message).toBe('Restaurant.phone cannot be null');
            }
            else {
                throw error;
            }
        }
    }));
    it('should throw an error when phone is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield models_1.Restaurant.create({
                username: 'restaurant123',
                email: 'contact@restaurant.com',
                password: 'securepassword123',
                phone: '12345',
                address_id: null,
                has_service_tax: true,
            });
        }
        catch (error) {
            if (error instanceof sequelize_1.ValidationError) {
                expect(error.errors[0].message).toBe('Phone must be a valid phone number');
            }
            else {
                throw error;
            }
        }
    }));
    it('should throw an error when has_service_tax is not a boolean', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield models_1.Restaurant.create({
                username: 'restaurant123',
                email: 'contact@restaurant.com',
                password: 'securepassword123',
                phone: '27000000000',
                address_id: null,
                has_service_tax: 'yes', // Erro aqui
            });
        }
        catch (error) {
            if (error instanceof sequelize_1.ValidationError) {
                expect(error.errors[0].message).toBe('Has service tax must be a boolean');
            }
            else {
                throw error;
            }
        }
    }));
    it('should allow address_id to be null', () => __awaiter(void 0, void 0, void 0, function* () {
        const restaurant = yield models_1.Restaurant.create({
            username: 'restaurant123',
            email: 'contact@restaurant.com',
            password: 'securepassword123',
            phone: '27000000000',
            address_id: null,
            has_service_tax: true,
        });
        expect(restaurant.address_id).toBeNull();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.sequelize.close();
    }));
});
//# sourceMappingURL=RestaurantModel.test.js.map