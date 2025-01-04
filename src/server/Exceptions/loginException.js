class loginException extends Error {
    constructor(message) {
        super(message);
        this.name = "loginException";
    }
}

module.exports = loginException;