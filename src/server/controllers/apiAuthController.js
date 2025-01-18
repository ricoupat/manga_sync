const service = require("../services/apiBddService");
const jwt = require("jsonwebtoken");

class apiAuthController {

    async loginMember(req, res) {
        try {
            const { login, password } = req.body;
            const member = await service.getMemberByLogin(login, password);

            const token = jwt.sign({ id: member._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 60 * 60 * 1000,
            });
            res.status(200).send({ isPasswordValid: true });
        } catch (error) {
            if (error.name === "loginException") {
                res.status(401).send(error.message)
            }
            else {
                res.status(500).send({ error: "ServerError", message: error.message })
            }
        }
    }

    async logoutMember(req, res) {
        try {
            res.clearCookie('authToken');
            res.status(200).send({ isLoggedIn: false });
        } catch (error) {
            res.status(500).send({ error: "ServerError", message: error.message })
        }
    }

    async checkAuthentication(req, res) {
        try {
            const token = req.cookies.authToken;

            if (!token) {
                res.status(401).send({ message: "Access denied" });
            }
            else {
                jwt.verify(token, process.env.JWT_SECRET);
                res.status(200).json({ message: 'Authentication successful' });
            }
        } catch (error) {
            res.status(401).send({ error: "ServerError", message: "Authentication failed" })
        }
    }
}

module.exports = new apiAuthController();