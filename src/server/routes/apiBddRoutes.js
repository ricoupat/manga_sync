const express = require("express");
const router = express.Router();
const bbdController = require("../controllers/apiBddController");

router.get("/", bbdController.getAllMembers);
router.post("/usernameValidate", bbdController.checkUsername)
router.post("/login", bbdController.checkAuthentication);
router.post("/", bbdController.createMember);
router.patch("/:id", bbdController.updateMember);
router.delete("/:id", bbdController.deleteMember);

module.exports = router;