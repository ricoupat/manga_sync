const service = require('../services/apiBddService');
const registrationException = require("../Exceptions/registrationException");

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
            await service.getMemberByLogin(login, password);

            res.status(200).send({ isPasswordValid: true });

        } catch (error) {
            if (error.name === "loginException") {
                res.status(401).send(error.message)
            }
            else {
                res.status(500).send({ error: "ServerError", message: "An unexpected error occurred" })
            }
        }
    }

    async createMember(req, res) {
        try {
            const member = await service.createMember(req.body);
            res.status(201).json(member);
        } catch (error) {
            if (error instanceof registrationException) {
                res.status(400).send({ error: "ValidationError", details: error.errors })
            }
            else {
                res.status(500).json({ error: "ServerError", message: "An unexpected error occurred" });
            }
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