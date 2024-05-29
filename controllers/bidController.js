const bidService = require("../services/bidService");

exports.getBidsByItem = async (req, res) => {
    try {
      const bids = await bidService.getBidsByItem(req.params.itemId);
      res.status(200).json(bids);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  exports.createBid = async (req, res) => {
    try {
      const bid = await bidService.createBid(req.params.itemId, req.user.id, req.body.bidAmount);
      res.status(201).json(bid);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };