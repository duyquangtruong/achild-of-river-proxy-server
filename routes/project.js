const express = require("express");
const projectController = require("../controllers/project.controller");
const router = express.Router();

router.post("/", projectController.createProject);
router.get("/", projectController.getAllProjectIndex);
router.get("/enabled", projectController.getAllEnabledProjectIndex);
router.get("/name/:nameId", projectController.getProjectByNameId);
router.put("/:nameId", projectController.updateProject);
router.delete("/:nameId", projectController.deleteProject);

module.exports = router;
