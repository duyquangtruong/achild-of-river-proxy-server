const Project = require("../model/project.model");

const createProject = async (data) => {
    const newProject = new Project(data);
    return await newProject.save();
};

const getAllProjectIndex = async () => {
    return await Project.aggregate([
        {
            $project: {
                name: 1,
                nameId: 1,
                index: 1,
                firstSlider3Item: { $arrayElemAt: ["$slider3", 0] } // Get first item of slider3
            }
        }
    ]);
};

const getProjectDetail = async (nameId) => {
    return await Project.findOne({ nameId: nameId });
};

const updateProject = async (nameId, updateData) => {
    return await Project.findOneAndUpdate(
        { nameId: nameId }, // Find by nameId
        { $set: updateData }, // Update fields
        { new: true } // Return the updated document
    );
};

const deleteProject = async (nameId) => {
    return await Project.findOneAndDelete({ nameId: nameId });
};

module.exports = {
    createProject,
    getAllProjectIndex,
    getProjectDetail,
    updateProject,
    deleteProject
};