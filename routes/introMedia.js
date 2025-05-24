const express = require("express");
const introMediaController = require("../controllers/introMedia.controller");
const router = express.Router();

router.get("/", introMediaController.getAllIntroMedia);
router.post("/", introMediaController.createIntroMedia);
router.put("/:id", introMediaController.updateIntroMedia);
router.delete("/:id", introMediaController.deleteIntroMedia);

module.exports = router;
