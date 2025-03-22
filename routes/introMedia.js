const express = require("express");
const introMediaController = require("../controllers/introMedia.controller");
const router = express.Router();

router.get("/", introMediaController.getAllIntroMedia);

module.exports = router;
