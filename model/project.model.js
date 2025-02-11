const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  nameId: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String, required: false },
  description: { type: String, required: false },
  paragraph: { type: String, required: false },
  year: { type: Number, required: false },
  categories: { type: Array, required: false },
  client: { type: String, required: false },
  contributors: { type: Array, required: false },
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
