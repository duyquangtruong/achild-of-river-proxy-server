const mongoose = require("mongoose");

const projectFieldSchema = new mongoose.Schema({
  title: { type: String, required: false },
  content: { type: [String], default: [] },
  link: {
    type: String,
    required: false,
    trim: true,
    validate: {
      validator: (v) => !v || /^https?:\/\//i.test(v),
      message: (props) => `Invalid project field link "${props.value}". It must start with http:// or https://`
    }
  }
}, { _id: false });

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
  desktopIntroImg: { type: String, required: false },
  projectFields: { type: [projectFieldSchema], required: false },
  isEnabled: { type: Boolean, default: true }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;