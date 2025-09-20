const express = require("express");
const router = express.Router();
const { register, login, getSettings, saveSettings} = require("../controllers/userController");
const protect = require("../middleware/auth");