const jwt = require("jsonwebtoken");
const prisma = require("../config/database");

const authMiddleware = async( req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message: "No token provided."});
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where:{
                id:decoded.userId
            }
        });

        if(!user){
            return res.status(401).json({message: "User not found."});
        }

        req.user = user;
        next();


    }
    catch(error){
        return res.status(401).json({message: "Token invalid."});
    }

};

module.exports = authMiddleware;