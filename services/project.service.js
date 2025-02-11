const Project = require("../model/project.model");

const createProject = async (data) => {
    const newImage = new Project(data);
    return await newImage.save();
};
  
const getAllProjects = async () => {
    return await Project.find();
  };

  const getProjectByNameId = async (inputNameId) => {
    return await Project.findOne({nameId: inputNameId});
};
  
const getProjectById = async (id) => {
    return await Project.findById(id);
};

const updateProject = async (id, data) => {
    return await Project.findByIdAndUpdate(id, data, { new: true });
  };
  
const deleteProject = async (id) => {
    return await Project.findByIdAndDelete(id);
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectByNameId,
    getProjectById,
    updateProject,
    deleteProject,
};