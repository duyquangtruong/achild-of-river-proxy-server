const IntroMedia = require("../model/introMedia.model");

const getAllIntroMedia = async () => {
    return IntroMedia.find({});
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
    getAllIntroMedia,
    createIntroMedia,
    updateIntroMedia,
    deleteIntroMedia
};
