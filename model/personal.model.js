const mongoose = require("mongoose");

const PersonalSchema = new mongoose.Schema({
    title: { type: String, required: false },
    heroTitle: { type: String, required: false },
    stackImages: { type: Array, required: false },
    url: { type: String, required: false },
    paragraphTitle1: { type: String, required: false },
    paragraph1: { type: String, required: false },
    paragraphTitle2: { type: String, required: false },
    paragraph2: { type: String, required: false },
    bodyImages: { type: Array, required: false },
});

const Personal = mongoose.model("Personal", PersonalSchema);

module.exports = Personal;
