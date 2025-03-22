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
  paragraph1Title: { type: String, required: false },
  paragraph1: { type: String, required: false },
  paragraph2Title: { type: String, required: false },
  paragraph2: { type: String, required: false },
  paragraph1Title: { type: String, required: false },
  year: { type: Number, required: false },
  client: { type: String, required: false },
  designFirm: { type: String, required: false },
  director: { type: Array, required: false },
  scopeOfWork: { type: Array, required: false },
  designers: { type: Array, required: false },
  // tbd: { type: Array, required: false },
  // tbd: { type: Array, required: false },
  contributors: { type: Array, required: false },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;