const mongoose = require("mongoose");

const IntroMediaMobileSchema = new mongoose.Schema({
    name: { type: String, required: false },
    index: { type: Number, required: false },
    url: { type: String, required: false },
});

const IntroMediaMobile = mongoose.model("IntroMediaMobile", IntroMediaMobileSchema);

module.exports = IntroMediaMobile;
