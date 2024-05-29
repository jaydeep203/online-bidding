

exports.getProfile = async(req, res) => {
    try{

        const user = req.user;
        res.status(200).json(user);

    }
    catch(error){
        res.status(400).json({message:error.message});
    }
}