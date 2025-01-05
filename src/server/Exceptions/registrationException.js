class registrationException extends Error {
    constructor(errors) {
        super("Registration error occurred");
        this.name = "registrationException";
        this.errors = errors;
    }
}

module.exports = registrationException;