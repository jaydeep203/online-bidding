const prisma = require("../config/database");


const getId = async(token) => {

    const userId = await prisma.user.findFirst({
        where:{
            id:token
        },
        select:{
            id:true
        }
    });

    if(!userId){
        throw new Error("Invalid Id.");
    }

    return {userId : userId};

}

module.exports = {getId};