const Member = require("../models/Members");

class apiBddRepository {
    async findAll() {
        return Member.find();
    }

    async findByLogin(login) {
        try {
            return await Member.findOne(login);
        } catch (error) {
            throw error;
        }

    }

    async create(data) {
        const newMember = new Member(data);
        try {
            await newMember.save();
            return newMember;
        } catch (error) {
            throw error;
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