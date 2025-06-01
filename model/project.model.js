const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameId: { type: String, required: true },
  index: { type: Number, required: false },
  slider1: { type: Array, required: false },
  slider2: { type: Array, required: false },
  slider3: { type: Array, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  paragraphs: { type: Array, required: false },
  coverImg: { type: Array, required: false },
  mobileIndexImg: { type: String, required: false },
  projectFields: { type: Array, required: false }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;