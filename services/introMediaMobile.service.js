const IntroMediaMobile = require("../model/introMediaMobile.model");

const getAllIntroMediaMobile = async () => {
    return IntroMediaMobile.find({});
};
const createIntroMediaMobile = async (data) => {
    const newIntroMediaMobile = new IntroMediaMobile(data);
    return newIntroMediaMobile.save();
};

const updateIntroMediaMobile = async (id, updateData) => {
    return IntroMediaMobile.findOneAndUpdate(
        { _id: id }, // Find by nameId
        { $set: updateData }, // Update fields
        { new: true } // Return the updated document
    );
};

const deleteIntroMediaMobile = async (id) => {
    return IntroMediaMobile.findOneAndDelete({ _id: id });
};

module.exports = {
    getAllIntroMediaMobile,
    createIntroMediaMobile,
    updateIntroMediaMobile,
    deleteIntroMediaMobile
};
