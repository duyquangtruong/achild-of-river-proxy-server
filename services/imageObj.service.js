const ImageObj = require("../model/imageObj.model");

const createImageObj = async (data) => {
    const newImage = new ImageObj(data);
    return newImage.save();
};

const getAllImageObjs = async () => {
    return ImageObj.find();
};

const getImageObjById = async (id) => {
    return ImageObj.findById(id);
};

const updateImageObj = async (id, data) => {
    return ImageObj.findByIdAndUpdate(id, data, { new: true });
};

const deleteImageObj = async (id) => {
    return ImageObj.findByIdAndDelete(id);
};

module.exports = {
    createImageObj,
    getAllImageObjs,
    getImageObjById,
    updateImageObj,
    deleteImageObj,
};
