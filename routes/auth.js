const jwt = require('jsonwebtoken');

// Authorization: Bearer <token>
function verifyToken (req, res, next){
    const bearerHeader = req.header('authorization');

    if(typeof bearerHeader !== 'undefined'){        
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;

        jwt.verify(req.token, process.env.TOKEN_SECRET, (error, authData) =>{
            if(error){
                res.status(403).send('Invalid Token');
            }else{
                next();
            }
        });
         
    }else{    
        res.status(400).send('Invalid Token');
    }
}

module.exports = verifyToken;