const validator = require("validator");

class formValidator {

    static MIN_LENGTH_SURNAME = 3;
    static MAX_LENGTH_SURNAME = 12;
    static MIN_LENGTH_PASSWORD = 8;
    static MAX_LENGTH_PASSWORD = 20;

    constructor() {
        this.results = {
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    sanitizeField(field) {
        return validator.escape(field.trim().toLowerCase());
    }

    sanitizeFields(fields) {
        let res = {};
        for (const key of Object.keys(fields)) {
            res[key] = this.sanitizeField(fields[key]);
        }
        return res;
    }

    surnameValidation(surname) {
        const sanitized = this.sanitizeField(surname);
        const usernameRegex = new RegExp(`^[a-zA-Z0-9]{${formValidator.MIN_LENGTH_SURNAME},${formValidator.MAX_LENGTH_SURNAME}}$`);

        if (!sanitized || !usernameRegex.test(sanitized)) {
            this.results.surname = "3 to 20 lowercase letters";
            return false;
        }
         return true;
    }

    emailValidation(mail) {
        const sanitized = this.sanitizeField(mail);
        const regex = /^[^\s@&]+@[^\s@&]+\.[^\s@&]+$/;
        if (!sanitized || !regex.test(sanitized)) {
            this.results.email = "Invalid email format";
            return false;
        }
        return true;
    }

    passwordValidation(password) {
        const complexity = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!password || password.length < formValidator.MIN_LENGTH_PASSWORD || password.length > formValidator.MAX_LENGTH_PASSWORD) {
            this.results.password = "Password must be between 8 and 20 characters long.";
            return false;
        }
        else if (!complexity.test(password)) {
            this.results.password = "Password must include at least an [A-Z], [a-z], [0-9] and a special character.";
            return false;
        }
        else {
            return true;
        }
    }

    passwordsConfirmation(password, confirmation) {
        if (password !== confirmation) {
            this.results.confirmPassword = "Password and confirmation don't match";
            return false;
        }
        else {
            return true;
        }
    }

    checkRegistration(login, email, password, confPassword) {
        const isNameValid = this.surnameValidation(login);
        const isEmailValid = this.emailValidation(email);
        const isPasswordValid = this.passwordValidation(password) ;
        const isConfValid = this.passwordsConfirmation(password, confPassword);

        const valid = isNameValid && isEmailValid && isPasswordValid && isConfValid ;

        const errors = {};
        for (const key of Object.keys(this.results)) {
            const message = this.results[key];

            if (message !== '') {
                errors[key] = message;
            }
        }
        return { valid, errors };
    }
}

module.exports = formValidator;