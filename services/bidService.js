const prisma = require("../config/database");

const getBidsByItem = async (itemId) => {
    const bids = await prisma.bid.findMany({
      where: { itemId: parseInt(itemId) },
      orderBy: { createdAt: 'asc' }
    });
    return bids;
  };

  const createBid = async (itemId, userId, bidAmount) => {
    const item = await prisma.item.findUnique({
      where: { id: parseInt(itemId) },
      include: { bids: true }
    });
  
    if (!item) throw new Error('Item not found');
    if (new Date(item.endTime) < new Date()) throw new Error('Auction has ended');

    
  
    const newBid = await prisma.bid.create({
      data: {
        itemId: parseInt(itemId),
        userId: parseInt(userId),
        bidAmount: parseFloat(bidAmount),
        createdAt: new Date()
      }
    });

    if(bidAmount>item.currentPrice){
      await prisma.notification.create({
        data:{
          userId,
          message: `We wanted to inform you that your bid on the item ${item.name} has been outbid. The current highest bid is now ${bidAmount}.`,
          createdAt: new Date()
        }
      });
    }
  
    await prisma.item.update({
      where: { id: parseInt(itemId) },
      data: {
        currentPrice: parseFloat(bidAmount)
      }
    });

    const userIds = [...new Set(item.bids.map(bid=>bid.userId))];

    const notifications = userIds.map(userId => ({
      userId,
      message: `A new bid has been placed of ${bidAmount} on the ${item.name}`,
      createdAt: new Date()
    }));

    

    await prisma.notification.createMany({
      data:notifications
    });
  
    return newBid;
  };

  

module.exports = {
    getBidsByItem,
    createBid
};