const jwt = require("jsonwebtoken");

const authMiddleware = async( req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message: "No token provided."});
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(decoded.userId){
        req.token = decoded.userId;
        next();
    }
    else{
        return res.status(401).json({message: "Token invalid."});
    }
    
};

module.exports = authMiddleware;