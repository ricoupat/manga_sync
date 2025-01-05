const bcryptjs = require('bcryptjs');

class passwordSecurity {

    async hashPassword(password, saltRounds = 10) {
        return await bcryptjs.hash(password, saltRounds);
    }

    async comparePasswords(password, hashedPassword) {
        return await bcryptjs.compare(password, hashedPassword);
    }
}

module.exports = new passwordSecurity();
