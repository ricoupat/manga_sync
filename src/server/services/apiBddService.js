const Repository = require("../Repository/apiBddRepository");

class apiBddService {
    async getAllMembers() {
        return await Repository.findAll();
    }

    async getMemberById(id) {
        const employee = await Repository.findById(id);
        if (!employee) throw new Error("Employee not found");
        return employee;
    }

    async createMember(data) {
        return await Repository.create(data);
    }

    async updateMember(id, data) {
        const updatedEmployee = await Repository.update(id, data);
        if (!updatedEmployee) throw new Error("Employee not found");
        return updatedEmployee;
    }

    async deleteMember(id) {
        const deletedEmployee = await Repository.delete(id);
        if (!deletedEmployee) throw new Error("Employee not found");
        return deletedEmployee;
    }
}

module.exports = new apiBddService();
