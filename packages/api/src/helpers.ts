
export const isValidCreditCardNumber = (value: string) => {
    // Validate credit card number using the Luhn algorithm
    // https://en.wikipedia.org/wiki/Luhn_algorithm

    // Remove any non-digits and reverse the string
    let cleanValue = value.replace(/\D/g, '');

    if (cleanValue === '') {
        return false;
    }

    let reversedDigits = cleanValue.split('').reverse();

    let sum = 0;

    // Iterate over the reversed digits
    for (let i = 0; i < reversedDigits.length; i++) {
        let digit = parseInt(reversedDigits[i]);

        // Double every second digit starting from the right
        if (i % 2 !== 0) {
            digit *= 2;

            // If doubling results in a number greater than 9, subtract 9 to get the equivalent single-digit sum
            if (digit > 9) {
                digit -= 9;
            }
        }

        // Add the current digit to the sum
        sum += digit;
    }

    // The credit card number is valid if the sum modulo 10 is equal to 0
    return sum % 10 === 0;
}