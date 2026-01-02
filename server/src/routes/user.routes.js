const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const userController = require("../controllers/user.controller");

router.get("/profile", auth, userController.getProfile);

module.exports = router;
