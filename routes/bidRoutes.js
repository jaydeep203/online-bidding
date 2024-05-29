const express = require("express");
const router = express.Router();

const bidController = require("../controllers/bidController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:itemId/bids", bidController.getBidsByItem);
router.post("/:itemId/bids", authMiddleware, bidController.createBid);

module.exports = router;