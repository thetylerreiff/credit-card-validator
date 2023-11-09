import { FormValues } from "./types";

const API_URL = process.env.REACT_APP_API_URL || `http://localhost:4000`;

export const validate = async (values: FormValues) => {
    const { cardNumber } = values;
    const response = await fetch(
        `${API_URL}/validate`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ cardNumber }),
        }
    );
    const data = await response.json();
    if (!data.isValid) {
        return { cardNumber: data.message };
    } else {
        return {};
    }
}