const introMediaService = require("../services/introMedia.service");

const getAllIntroMedia = async (req, res) => {
    try {
        const projects = await introMediaService.getAllIntroMedia();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllIntroMedia
};