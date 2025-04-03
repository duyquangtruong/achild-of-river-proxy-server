const express = require("express");
const personalController = require("../controllers/personal.controller");
const router = express.Router();

router.get("/", personalController.getPersonalInfo);
router.put("/:id", personalController.updatePersonalInfo);

module.exports = router;
