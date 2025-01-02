const service = require('../services/apiBddService');

class apiBddController {
    async getAllMembers(req, res) {
        try {
            const members = await service.getAllMembers();
            res.status(200).send(members);
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    async getMemberById(req, res) {
        try {
            const member = await service.getMemberById(req.params.id);
            res.status(200).send(member);
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    async createMember(req, res) {
        try {
            const member = await service.createMember(req.body);
            res.status(201).json(member);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateMember(req, res) {
        try {
            const member = await service.updateMember(req.params.id, req.body);
            res.status(202).json(member);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteMember(req, res) {
        try {
            const member = await service.deleteMember(req.params.id);
            res.status(203).json(member);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new apiBddController();