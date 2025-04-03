const Personal = require("../model/personal.model");

const getPersonalInfo = async () => {
    return Personal.findOne();
};

const updatePersonalInfo = async (personalId, updateData) => {
    return Personal.findOneAndUpdate(
        { _id: personalId },
        { $set: updateData },
        { new: true }
    );
};

module.exports = {
    getPersonalInfo,
    updatePersonalInfo
};
