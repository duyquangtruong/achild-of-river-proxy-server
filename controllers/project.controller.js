const ProjectService = require("../services/project.service");

// Create a new Project
const createProject = async (req, res) => {
  try {
    const Project = await ProjectService.createProject(req.body);
    res.status(201).json(Project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Projects
const getAllProjects = async (req, res) => {
  try {
    const Projects = await ProjectService.getAllProjects();
    res.status(200).json(Projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProjectByNameId = async (req, res) => {
    try {
      const Project = await ProjectService.getProjectByNameId(req.params.nameId);
      if (!Project) return res.status(404).json({ message: "Project not found" });
      res.status(200).json(Project);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// Get a single Project
const getProjectById = async (req, res) => {
  try {
    const Project = await ProjectService.getProjectById(req.params.id);
    if (!Project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(Project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an Project
const updateProject = async (req, res) => {
  try {
    const updatedProject = await ProjectService.updateProject(req.params.id, req.body);
    if (!updatedProject) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an Project
const deleteProject = async (req, res) => {
  try {
    const deletedProject = await ProjectService.deleteProject(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectByNameId,
  getProjectById,
  updateProject,
  deleteProject,
};
