const Member = require("../models/Members");
const bcrypt = require("bcryptjs");

class apiBddRepository {
    async findAll() {
        return Member.find();
    }

    async findByLogin(login) {
        return Member.findOne(login);
    }

    async create(data) {
        data.password = await bcrypt.hash(data.password, 10);
        const newMember = new Member(data);
        try {
            await newMember.save();
            return newMember;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, data) {
        return Member.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return Member.findByIdAndDelete(id);
    }
}

module.exports = new apiBddRepository();