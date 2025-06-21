const introMediaService = require("../services/introMedia.service");

const getAllIntroMedia = async (req, res) => {
    try {
        const projects = await introMediaService.getAllIntroMediaDesktop();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllIntroMediaBothDevice = async (req, res) => {
    try {
        const projectsDesktop = await introMediaService.getAllIntroMediaDesktop();
        const projectsMobile = await introMediaService.getAllIntroMediaMobile();
        res.status(200).json({
            desktop: projectsDesktop,
            mobile: projectsMobile
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const createIntroMedia = async (req, res) => {
    try {
        const project = await introMediaService.createIntroMedia(req.body);
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateIntroMedia = async (req, res) => {
    try {
        const updatedIntroMedia = await introMediaService.updateIntroMedia(req.params.id, req.body);
        if (!updatedIntroMedia) return res.status(404).json({ message: "Count not update the IntroMedia!" });
        res.status(200).json(updatedIntroMedia);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteIntroMedia = async (req, res) => {
    try {
        const deletedIntroMedia = await introMediaService.deleteIntroMedia(req.params.id);
        if (!deletedIntroMedia) return res.status(404).json({ message: "IntroMedia not found!" });
        res.status(200).json({ message: "IntroMedia has been deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllIntroMedia,
    getAllIntroMediaBothDevice,
    createIntroMedia,
    updateIntroMedia,
    deleteIntroMedia
};