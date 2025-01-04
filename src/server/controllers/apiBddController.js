const service = require('../services/apiBddService');
const bcryptjs = require('bcryptjs');
const loginException = require("../Exceptions/loginException");

class apiBddController {
    async getAllMembers(req, res) {
        try {
            const members = await service.getAllMembers();
            res.status(200).send(members);
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    async checkAuthentication(req, res) {
        try {
            const { login, password } = req.body;
            const member = await service.getMemberByLogin(login);
            const isPasswordValid = await bcryptjs.compare(password, member.password);
            if (!isPasswordValid) {
                res.status(401).send({ isPasswordValid: false });
            }
            else {
                res.status(200).send({ isPasswordValid: true });
            }
        } catch (error) {
            if (error.name === "loginException") {
                res.status(401).send(error.message)
            }
            else {
                res.status(500).send({message: error.message})
            }
        }
    }

    async createMember(req, res) {
        try {
            const member = await service.createMember(req.body);
            res.status(201).json(member);
            console.log("added member with ", member);
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log("Error adding member ");
        }
    }

    async updateMember(req, res) {
        try {
            const member = await service.updateMember(req.params.id, req.body);
            res.status(200).json(member);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteMember(req, res) {
        try {
            const member = await service.deleteMember(req.params.id);
            res.status(200).json(member);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new apiBddController();