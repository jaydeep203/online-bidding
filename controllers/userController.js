const userService = require("../services/userService");

exports.getProfile = async(req, res) => {
    try{

        const user = req.user;
        res.status(200).json(user);

    }
    catch(error){
        res.status(400).json({message:error.message});
    }
}

exports.getUserId = async(req, res) => {
    try{
        const userId = await userService.getId(req.token);
        res.status(201).json(userId);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
}
