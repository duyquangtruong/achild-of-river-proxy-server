const personalService = require("../services/personal.service");

const getPersonalInfo = async (req, res) => {
    try {
        const personalInfo = await personalService.getPersonalInfo();
        if (!personalInfo) return res.status(404).json({ message: `Cannot find any Personal data` });
        res.status(200).json(personalInfo);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

const updatePersonalInfo = async (req, res) => {
    try {
        const updatedInfo = await personalService.updatePersonalInfo(req.params.id, req.body);
        if (!updatedInfo) return res.status(404).json({ message: "Count not update Personal data!" });
        res.status(200).json(updatedInfo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getPersonalInfo,
    updatePersonalInfo
};