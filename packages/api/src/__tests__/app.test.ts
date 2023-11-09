import request from "supertest";
import { app } from "../app";
import { isValidCreditCardNumber } from "../helpers";

jest.mock("../helpers");

describe("GET /validate", () => {
    it("should return 200 if credit card number is valid", async () => {
        (isValidCreditCardNumber as jest.Mock).mockReturnValue(true);

        const response = await request(app).post("/validate");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ isValid: true });
    });

    it("should return 400 if credit card number is invalid", async () => {
        (isValidCreditCardNumber as jest.Mock).mockReturnValue(false);

        const response = await request(app).post("/validate");

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ isValid: false, message: "Card number is invalid" });
    });
});
