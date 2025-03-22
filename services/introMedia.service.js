const IntroMedia = require("../model/introMedia.model");

const getAllIntroMedia = async () => {
    return IntroMedia.find({});
};

module.exports = {
    getAllIntroMedia
};
