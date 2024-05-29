const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const notificationController = require("../controllers/notificationController");

router.get("/", authMiddleware, notificationController.getNotificationsForUser);
router.post("/mark-read", authMiddleware, notificationController.markNotificationsAsRead);


module.exports=router;