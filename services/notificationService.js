const prisma = require("../config/database");

const getNotificationsForUser = async(id) => {

    const notifications = await prisma.notification.findMany({
        where:{
            userId:parseInt(id)
        },
        orderBy:{createdAt:"desc"}
    });

    return notifications;

}

const markNotificationsAsRead = async(userId, notificationIds) => {
    
    await prisma.notification.updateMany({
        where:{
            userId:parseInt(userId),
            id:{in:notificationIds}
        },
        data:{
            isRead: true
        }
    })

}

module.exports = {
    getNotificationsForUser,
    markNotificationsAsRead
}