const IntroMedia = require("../model/introMedia.model");
const Project = require("../model/project.model");

const getAllIntroMediaDesktop = async () => {
    return IntroMedia.find({});
};
const getAllIntroMediaMobile = async () => {
    return Project.find({}, {
        mobileIndexImg: 1,
        index: 1,
        _id: 0
    }).sort({ index: 1 }); // ascending order  
};

const createIntroMedia = async (data) => {
    const newIntroMedia = new IntroMedia(data);
    return newIntroMedia.save();
};

const updateIntroMedia = async (id, updateData) => {
    return IntroMedia.findOneAndUpdate(
        { _id: id }, // Find by nameId
        { $set: updateData }, // Update fields
        { new: true } // Return the updated document
    );
};

const deleteIntroMedia = async (id) => {
    return IntroMedia.findOneAndDelete({ _id: id });
};

module.exports = {
    getAllIntroMediaDesktop,
    getAllIntroMediaMobile,
    createIntroMedia,
    updateIntroMedia,
    deleteIntroMedia
};
