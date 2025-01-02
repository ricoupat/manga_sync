const Employee = require("../models/Members");

class apiBddRepository {
    async findAll() {
        return Employee.find();
    }

    async findById(id) {
        return Employee.findById(id);
    }

    async create(data) {
        const employee = new Employee(data);
        return await employee.save();
    }

    async update(id, data) {
        return Employee.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return Employee.findByIdAndDelete(id);
    }
}

module.exports = new apiBddRepository();