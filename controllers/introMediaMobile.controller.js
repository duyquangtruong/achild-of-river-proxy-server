const introMediaMobileService = require("../services/introMediaMobile.service");

const getAllIntroMediaMobile = async (req, res) => {
    try {
        const projects = await introMediaMobileService.getAllIntroMediaMobile();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createIntroMediaMobile = async (req, res) => {
    try {
        const project = await introMediaMobileService.createIntroMediaMobile(req.body);
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateIntroMediaMobile = async (req, res) => {
    try {
        const updatedIntroMediaMobile = await introMediaMobileService.updateIntroMediaMobile(req.params.id, req.body);
        if (!updatedIntroMediaMobile) return res.status(404).json({ message: "Count not update the IntroMediaMobile!" });
        res.status(200).json(updatedIntroMediaMobile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteIntroMediaMobile = async (req, res) => {
    try {
        const deletedIntroMediaMobile = await introMediaMobileService.deleteIntroMediaMobile(req.params.id);
        if (!deletedIntroMediaMobile) return res.status(404).json({ message: "IntroMediaMobile not found!" });
        res.status(200).json({ message: "IntroMediaMobile has been deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllIntroMediaMobile,
    createIntroMediaMobile,
    updateIntroMediaMobile,
    deleteIntroMediaMobile
};