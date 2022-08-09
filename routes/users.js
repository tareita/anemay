const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.patch("/:username", auth.verifyToken, userController.updateAboutMe);

module.exports = router;
