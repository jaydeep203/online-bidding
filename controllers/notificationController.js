const notificationService = require("../services/notificationService");

exports.getNotificationsForUser = async(req, res) =>{
    try{

        const notifications = await notificationService.getNotificationsForUser(req.user.id);
        res.status(200).json(notifications);

    }catch(error){
        res.status(400).json({message:error.message});
    }
}

exports.markNotificationsAsRead = async(req, res) => {
    try{

        await notificationService.markNotificationsAsRead(req.user.id, req.body.notificationIds);
        res.status(200).json({message:"Notification marked as read."});

    }catch(error){
        res.status(400).json({message:error.message});
    }
}