const express = require("express");
const router = express.Router();
const bddController = require("../controllers/apiBddController");

router.get("/", bddController.getAllMembers);
router.post("/usernameValidate", bddController.checkUsername)
router.post("/", bddController.createMember);
router.patch("/:id", bddController.updateMember);
router.delete("/:id", bddController.deleteMember);

module.exports = router;