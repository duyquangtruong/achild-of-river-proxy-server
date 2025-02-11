const ImageObj = require("../model/imageObj.model");

const createImageObj = async (data) => {
    const newImage = new ImageObj(data);
    return await newImage.save();
};
  
const getAllImageObjs = async () => {
    return await ImageObj.find();
  };
  
const getImageObjById = async (id) => {
    return await ImageObj.findById(id);
};

const updateImageObj = async (id, data) => {
    return await ImageObj.findByIdAndUpdate(id, data, { new: true });
  };
  
const deleteImageObj = async (id) => {
    return await ImageObj.findByIdAndDelete(id);
};

module.exports = {
    createImageObj,
    getAllImageObjs,
    getImageObjById,
    updateImageObj,
    deleteImageObj,
};
