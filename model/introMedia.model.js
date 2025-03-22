const mongoose = require("mongoose");

const IntroMediaSchema = new mongoose.Schema({
    name: { type: String, required: false },
    index: { type: Number, required: false },
    url: { type: String, required: false },
});

const IntroMedia = mongoose.model("IntroMedia", IntroMediaSchema);

module.exports = IntroMedia;
