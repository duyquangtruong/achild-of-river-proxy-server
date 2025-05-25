const express = require("express");
const introMediaMobileController = require("../controllers/introMediaMobile.controller");
const router = express.Router();

router.get("/", introMediaMobileController.getAllIntroMediaMobile);
router.post("/", introMediaMobileController.createIntroMediaMobile);
router.put("/:id", introMediaMobileController.updateIntroMediaMobile);
router.delete("/:id", introMediaMobileController.deleteIntroMediaMobile);

module.exports = router;
