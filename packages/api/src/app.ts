import bodyParser from "body-parser";
import express, { Request } from "express";
import { isValidCreditCardNumber } from "./helpers";
import cors from "cors";
import morgan from "morgan";

type CreditCardValidationRequest = Request<{}, any, { cardNumber: string }>;

const LOGGING_FORMAT = process.env.LOGGING_FORMAT || 'dev';

export const app = express();

app.use(morgan(LOGGING_FORMAT));
app.use(cors());
app.use(bodyParser.json());

app.post("/validate", (req: CreditCardValidationRequest, res) => {
    try {
        const isValid = isValidCreditCardNumber(req.body.cardNumber);
        if (isValid) {
            res.status(200).send({ isValid });
        } else {
            res.status(400).send({ isValid, message: 'Card number is invalid' });
        }
    } catch {
        res.status(400).send({ isValid: false, message: 'Error validating card number' });
    }

});

export default app;

