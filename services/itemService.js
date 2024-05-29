const prisma = require("../config/database");

const getAllItems = async(query) => {

    const {page=1, limit=10} = query;
    const skip = (page-1)*limit;

    const items = await prisma.item.findMany({
        skip:parseInt(skip),
        take:parseInt(limit),
        orderBy:{
            createdAt:'desc'
        }
    });

    return items;
}

const createItem = async(data, userId, file) => {

    const {name, description, startingPrice, endTime} = data;
    const currentPrice = startingPrice;
    const imageUrl = file ? file.path : null;

    const item = await prisma.item.create({
        data:{
            name,
            description,
            startingPrice:parseFloat(startingPrice),
            currentPrice:parseFloat(currentPrice),
            imageUrl,
            endTime:new Date(endTime),
            createdAt:new Date(),
            userId
        }
    });

    return item;

}

const getItemById = async(id) => {
    const item = await prisma.item.findUnique({
        where:{
            id:parseInt(id)
        }
    });

    return item;
}

const updateItem = async(id, data, user) => {
    const item = await prisma.item.findUnique({
        where:{
            id:parseInt(id)
        }
    });

    if(!item){
        throw new Error("Item not found!");
    }

    if(item.userId!==user.id && user.role!=="admin"){
        throw new Error("Unauthorized.");
    }

    const updatedItem = await prisma.item.update({
        where:{
            id:parseInt(id)
        },
        data:{
            name:data.name? data.name : item.name,
            description: data.description? data.description : item.description,
            currentPrice: data.currentPrice ? parseFloat(data.currentPrice) : item.currentPrice,
            imageUrl: data.imageUrl ? data.imageUrl : item.imageUrl,
            endTime: data.endTime? data.endTime  : item.endTime
        }
    });


    return updatedItem;
}

const deleteItem = async(id, user) => {
    const item = await prisma.item.findUnique({
        where: { id: parseInt(id) },
      });
      if (!item) throw new Error('Item not found');
      if (item.userId !== user.id && user.role !== 'admin') throw new Error('Unauthorized');

      

      await prisma.item.delete({
        where: { id: parseInt(id) },
      });

}

module.exports={
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};