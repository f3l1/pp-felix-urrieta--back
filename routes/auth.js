
// Authorization: Bearer <token>
function verifyToken (req, res, next){
    const bearerHeader = req.header('authorization');
    
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next(); 
    }else{
        res.status(400).send('Invalid Token');
    }
}

module.exports = verifyToken;