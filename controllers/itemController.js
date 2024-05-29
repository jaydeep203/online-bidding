const itemService = require("../services/itemService");

exports.getAllItems = async(req, res)=>{

    try{

        const items = await itemService.getAllItems(req.query);
        res.status(200).json(items);

    }catch(error){
        res.status(400).json({message: error.message});
    }

}

exports.createItem = async(req, res) => {

    try{

        const item = await itemService.createItem(req.body, req.user.id, req.file);
        res.status(200).json(item);

    }catch(error){
        res.status(400).json({message:error.message});
    }

}

exports.getItemById = async(req, res) => {
    try{

        const item = await itemService.getItemById(req.params.id);
        res.status(200).json(item);

    }catch(error){
        res.status(400).json({message:error.message});
    }
}


exports.updateItem = async(req, res) => {
    try{
        const item = await itemService.updateItem(req.params.id, req.body, req.user);
        res.status(200).json(item);

    }catch(error){
        res.status(400).json({message:error.message});
    }
}

exports.deleteItem = async(req, res) => {
    try{

        await itemService.deleteItem(req.params.id, req.user);
        res.status(204).json({message:"Deleted successfully."});

    }catch(error){
        res.status(403).json({message:error.message});
    }
}
