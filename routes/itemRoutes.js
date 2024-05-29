const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const itemController = require("../controllers/itemController");
const authMiddleware = require("../middleware/authMiddleware");




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename:(req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only images are allowed (jpeg, jpg, png)'));
      }
    }
  });

router.get("/", itemController.getAllItems);
router.post("/", authMiddleware, upload.single('image'), itemController.createItem);
router.get("/:id", itemController.getItemById);
router.put("/:id", authMiddleware, itemController.updateItem);
router.delete("/:id", authMiddleware, itemController.deleteItem);

module.exports=router;