//initialize express router
const router = require('express').Router();
const jwt = require('jsonwebtoken');
let verifyToken = require('./auth');

//Import User Controller
const userController = require('../Controllers/userController');

router.get('/',verifyToken, function(req, res) {

    jwt.verify(req.token, process.env.TOKEN_SECRET, (error, authData) =>{
        if(error){
            res.sendStatus(403)

        }else{
            res.json({
                status: 'API Works',
                message: 'Welcome to FirstRest API'
            });
        }
    });
    
});

router.get('/createToken', function(req, res) {

    const user = {
        name:"Fulanito",
        email:"correo@ejemplo.com"
    }

    jwt.sign( {user}, process.env.TOKEN_SECRET, {expiresIn:'35s'}, (err, token) => {
       
        res.json({
            token
        });

    });
    
});

// User routes
router.route('/user', verifyToken)
    .get( userController.index)
    .post( userController.create);

    router.route('/user/:id')
    .delete(userController.delete);

//Export API routes
module.exports = router;