//initialize express router
const router = require('express').Router();
const jwt = require('jsonwebtoken');
let verifyToken = require('./auth');

//Import User Controller
const userController = require('../Controllers/userController');

router.post('/createToken', function(req, res) {

    const user = {
        name:"Fulanito",
        email:"correo@ejemplo.com"
    }

    jwt.sign( {user}, process.env.TOKEN_SECRET, {expiresIn:'60s'}, (err, token) => {
       
        res.json({
            token
        });

    });
    
});

// User routes
router.route('/user')
    .get(verifyToken, userController.index)
    .post(verifyToken, userController.create);

router.route('/search')
    .post(verifyToken, userController.searchNameHobby);

router.route('/user/:id')
    .delete(verifyToken,userController.delete);

router.route('/userGroup')
    .get(verifyToken, userController.userGroup);
   

//Export API routes
module.exports = router;