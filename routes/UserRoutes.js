const express = require("express");
const router = express.Router();
const { register, login, getSettings, saveSettings} = require("../controllers/userController");
const protect = require("../middleware/auth");


router.post("/register", register);
router.post("/login", login);
router.get("/settings", protect, getSettings);
router.post("/settings", protect, getSettings);

module.exports = router;