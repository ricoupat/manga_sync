const express = require("express");
const router = express.Router();
const authController = require("../controllers/apiAuthController");

router.post("/login", authController.loginMember);
router.post("/logout", authController.logoutMember)
router.post("/check-auth", authController.checkAuthentication);

module.exports = router;