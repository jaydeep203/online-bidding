const prisma = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async(userData) => {

    const { email, username, password } = userData;

    const existingUser = await prisma.user.findUnique({
        where:{email}
    });
    
    if(existingUser){
        throw new Error("user already exists.");
    }
    
    

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data:{
            email,
            password:hashedPassword,
            username
        }
    });

    const token = jwt.sign({
        userId:user.id,
        role:user.role
    }, 
        process.env.JWT_SECRET,
        {
            expiresIn:"24h"
        }
    );

    return {token: token};
};

const login = async(userData) => {

    const {email, password} = userData;

    const user = await prisma.user.findUnique({
        where:{
            email
        }
    });

    if(!user){
        throw new Error("Invalid credentials.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        throw new Error("Invalid credentials.");
    }

    const token = jwt.sign({
        userId:user.id,
        role:user.role
    }, 
        process.env.JWT_SECRET,
        {
            expiresIn:"24h"
        }
    );

    return {token : token};

}


module.exports = {register, login};