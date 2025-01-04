const Repository = require("../Repository/apiBddRepository");

class apiBddService {
    async getAllMembers() {
        return await Repository.findAll();
    }

    async getMemberByLogin(login) {
        const member = await Repository.findByLogin({ surname: login });
        if (!member) throw new Error("Member not found");
        return member;
    }

    async createMember(data) {
        return await Repository.create(data);
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
