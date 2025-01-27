const mongoose = require("mongoose");

const ImageObjSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const ImageObj = mongoose.model("ImageObj", ImageObjSchema);

module.exports = ImageObj;
