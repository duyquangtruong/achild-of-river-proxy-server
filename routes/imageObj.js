const express = require("express");
const imageObjController = require("../controllers/imageObj.controller");
const router = express.Router();

router.post("/", imageObjController.createImageObj);
router.get("/", imageObjController.getAllImageObjs);
router.get("/:id", imageObjController.getImageObjById); 
router.put("/:id", imageObjController.updateImageObj);
router.delete("/:id", imageObjController.deleteImageObj);

module.exports = router;
