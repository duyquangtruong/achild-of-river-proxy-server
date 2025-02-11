const express = require("express");
const projectController = require("../controllers/project.controller");
const router = express.Router();

router.post("/", projectController.createProject);
router.get("/", projectController.getAllProjects);
router.get("/name/:nameId", projectController.getProjectByNameId);
router.get("/id/:id", projectController.getProjectById);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;
