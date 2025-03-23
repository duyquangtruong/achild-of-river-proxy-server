const projectService = require("../services/project.service");

const createProject = async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllProjectIndex = async (req, res) => {
  try {
    const projects = await projectService.getAllProjectIndex();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProjectByNameId = async (req, res) => {
  try {
    const project = await projectService.getProjectDetail(req.params.nameId);
    if (!project) return res.status(404).json({ message: `Cannot find project with nameId = ${req.params.nameId} ` });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const updateProject = async (req, res) => {
  try {
    const updatedProject = await projectService.updateProject(req.params.nameId, req.body);
    if (!updatedProject) return res.status(404).json({ message: "Count not update the Project!" });
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const deletedProject = await projectService.deleteProject(req.params.nameId);
    if (!deletedProject) return res.status(404).json({ message: "Project not found!" });
    res.status(200).json({ message: "Project has been deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProject,
  getAllProjectIndex,
  getProjectByNameId,
  updateProject,
  deleteProject
};