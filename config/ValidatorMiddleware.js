import { parsePhoneNumberFromString } from "libphonenumber-js";
export default class ValidatorMiddleware {
    emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    usernameRegex = /^[a-zA-Z0-9_]+$/;

    validatePhone = (phone) => {
        const phoneNumber = parsePhoneNumberFromString(phone);
        return phoneNumber ? phoneNumber.isValid() : false;
    };
    
    emailValidator = (email) => {
        return this.emailRegex.test(email);
    };

    usernameValidator = (username) => {
        return this.usernameRegex.test(username);
    };

    pincodeValidator = (pincode) => {
        return /^[0-9]{6}$/.test(pincode);
    };
}
