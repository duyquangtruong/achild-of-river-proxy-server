import axios from 'axios';
import base64 from 'base-64';

const Project = require("../model/project.model");

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const createProject = async (data) => {
    const newProject = new Project(data);
    return newProject.save();
};

const getAllProjectIndex = async () => {
    return Project.aggregate([
        {
            $project: {
                name: 1,
                nameId: 1,
                index: 1,
                firstSlider3Item: { $arrayElemAt: ["$slider3", 0] } // Get first item of slider3
            }
        },
        {
            $sort: { index: 1 } // Sort by index in ascending order
        }
    ]);
};

const getProjectDetail = async (nameId) => {
    const currentProject = await Project.findOne({ nameId: nameId }).exec();
    const { index } = currentProject;

    // Get the total number of projects
    const totalProjects = await Project.countDocuments();
    const prevIndex = index > 1 ? index - 1 : totalProjects;
    const nextIndex = index < totalProjects ? index + 1 : 1;

    const prevProject = await Project.findOne({ index: prevIndex }).select("name nameId").exec();

    // Get next project if the index is less than totalProjects
    const nextProject = await Project.findOne({ index: nextIndex }).select("name nameId").exec();

    return {
        current: currentProject,
        previous: prevProject,
        next: nextProject,
    }
};

const getProjectImages = async (folderName) => {
    const auth = base64.encode(`${apiKey}:${apiSecret}`);

    axios.get(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image`, {
        headers: {
            Authorization: `Basic ${auth}`,
        },
        params: {
            prefix: `${folderName}/`,
            type: 'upload',
        },
    })
        .then(res => {
            console.log('Images:', res.data.resources);
        })
        .catch(err => {
            console.error(err);
        });
};

const updateProject = async (nameId, updateData) => {
    return Project.findOneAndUpdate(
        { nameId: nameId }, // Find by nameId
        { $set: updateData }, // Update fields
        { new: true } // Return the updated document
    );
};

const deleteProject = async (nameId) => {
    return Project.findOneAndDelete({ nameId: nameId });
};

module.exports = {
    createProject,
    getAllProjectIndex,
    getProjectDetail,
    updateProject,
    deleteProject
};