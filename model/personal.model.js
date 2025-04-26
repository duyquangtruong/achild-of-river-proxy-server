const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    xPos: { type: Number, required: false },
    yPos: { type: Number, required: false },
    rotation: { type: Number, required: false },
    height: { type: Number, required: false },
    width: { type: Number, required: false },
}, { _id: false });

const PersonalSchema = new mongoose.Schema({
    title: { type: String, required: false },
    heroTitle: { type: String, required: false },
    stackImages: { type: [ImageSchema], required: false },
    paragraphTitle1: { type: String, required: false },
    paragraph1: { type: String, required: false },
    paragraphTitle2: { type: String, required: false },
    paragraph2: { type: String, required: false },
    bodyImages: { type: [ImageSchema], required: false },
});

const Personal = mongoose.model("Personal", PersonalSchema);

module.exports = Personal;
