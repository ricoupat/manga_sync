const Repository = require("../Repository/apiBddRepository");
const formValidator = require("../Security/formValidator");
const loginException = require("../Exceptions/loginException");
const registrationException = require("../Exceptions/registrationException");
const passwordSecurity = require("../Security/passwordSecurity");


class apiBddService {
    async getAllMembers() {
        return await Repository.findAll();
    }

    async findExistingUser(login) {
        const saneLogin = new formValidator().sanitizeField(login.login);
        const member = await Repository.findByLogin(saneLogin)
        if (member) {
            return member.surname;
        }
        return null;
    }

    async getMemberByLogin(login, password) {
        try {
            const saneFields = new formValidator().sanitizeFields({login, password});
            const member = await Repository.findByLogin(saneFields.login);
            if (!member) {
                throw new loginException("Invalid login credentials");
            }

            const isPasswordValid = await passwordSecurity.comparePasswords(saneFields.password, member.password);

            if (!isPasswordValid) {
                throw new loginException("Invalid login credentials");
            }

            return member;

        } catch (error) {
            throw error;
        }
    }

    async createMember(data) {
        const { surname, email, password, confirmation } = data;
        const validator = new formValidator();

        const errors = validator.checkRegistration(surname, email, password, confirmation);
        const existingMember = await Repository.findByLogin(validator.sanitizeField(surname));
        if (existingMember) {
            errors.surname = "surname already used";
        }

        if (Object.keys(errors).length > 0 ) {
            throw new registrationException(errors);
        }

        const newData = validator.sanitizeFields({ surname, email, password })
        newData.password = await passwordSecurity.hashPassword(newData.password);

        try {
            return await Repository.create(newData);
        } catch (error) {
            throw error;
        }
    }

    async updateMember(id, data) {
        const updatedMember = await Repository.update(id, data);
        if (!updatedMember) throw new Error("Member not found");
        return updatedMember;
    }

    async deleteMember(id) {
        const deletedMember = await Repository.delete(id);
        if (!deletedMember) throw new Error("Member not found");
        return deletedMember;
    }
}

module.exports = new apiBddService();
