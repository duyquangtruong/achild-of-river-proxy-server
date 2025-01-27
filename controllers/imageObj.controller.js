const ImageObjService = require("../services/ImageObj.service");

// Create a new ImageObj
const createImageObj = async (req, res) => {
  try {
    const ImageObj = await ImageObjService.createImageObj(req.body);
    res.status(201).json(ImageObj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all ImageObjs
const getAllImageObjs = async (req, res) => {
  try {
    const ImageObjs = await ImageObjService.getAllImageObjs();
    res.status(200).json(ImageObjs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single ImageObj
const getImageObjById = async (req, res) => {
  try {
    const ImageObj = await ImageObjService.getImageObjById(req.params.id);
    if (!ImageObj) return res.status(404).json({ message: "ImageObj not found" });
    res.status(200).json(ImageObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an ImageObj
const updateImageObj = async (req, res) => {
  try {
    const updatedImageObj = await ImageObjService.updateImageObj(req.params.id, req.body);
    if (!updatedImageObj) return res.status(404).json({ message: "ImageObj not found" });
    res.status(200).json(updatedImageObj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an ImageObj
const deleteImageObj = async (req, res) => {
  try {
    const deletedImageObj = await ImageObjService.deleteImageObj(req.params.id);
    if (!deletedImageObj) return res.status(404).json({ message: "ImageObj not found" });
    res.status(200).json({ message: "ImageObj deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createImageObj,
  getAllImageObjs,
  getImageObjById,
  updateImageObj,
  deleteImageObj,
};
