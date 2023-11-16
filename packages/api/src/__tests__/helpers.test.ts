import { isValidCreditCardNumber } from "../helpers";

describe('isValidCreditCardNumber()', () => {
    it('should return true for valid credit card numbers', () => {
        expect(isValidCreditCardNumber('4556737586899855')).toBe(true);
        expect(isValidCreditCardNumber('5555555555554444')).toBe(true);
        expect(isValidCreditCardNumber('371449635398431')).toBe(true);
    });

    it('should return false for invalid credit card numbers', () => {
        expect(isValidCreditCardNumber('2345678901234567')).toBe(false);
        expect(isValidCreditCardNumber('5555555555555555')).toBe(false);
        expect(isValidCreditCardNumber('4211111111111111')).toBe(false);
        expect(isValidCreditCardNumber('0')).toBe(false);
        expect(isValidCreditCardNumber('00000000000000000000')).toBe(false);
        expect(isValidCreditCardNumber('')).toBe(false);
    });
})