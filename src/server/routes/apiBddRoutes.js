const express = require("express");
const router = express.Router();
const controller = require("../controllers/apiBddController");

router.get("/", controller.getAllMembers);
router.get("/:id", controller.getMemberById);
router.post("/", controller.createMember);
router.patch("/:id", controller.updateMember);
router.delete("/:id", controller.deleteMember);

module.exports = router;