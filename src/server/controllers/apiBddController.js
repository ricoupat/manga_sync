const service = require('../services/apiBddService');
const registrationException = require("../Exceptions/registrationException");
const jwt = require("jsonwebtoken");

class apiBddController {
    async getAllMembers(req, res) {
        try {
            const members = await service.getAllMembers();
            res.status(200).send(members);
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    async checkUsername(req, res) {
        try {
            const login = req.body;
            const surname = await service.findExistingUser(login);
            res.status(200).send(surname);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: "ServerError", message: "An unexpected error occurred" })
        }
    }

    async createMember(req, res) {
        try {
            const member = await service.createMember(req.body);
            const token = jwt.sign({ id: member._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 60 * 60 * 1000,
            });
            res.status(201).json(member);
        } catch (error) {
            if (error instanceof registrationException) {
                console.log(error.errors)
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