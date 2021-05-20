const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//Import User Model
const User = require('../Models/users');

//Get all Users
exports.index = async (req, res) => {
    User.get(function (err, user) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got user Successfully!",
            data: user   
        });
    });
};

// Create User
exports.create = async (req, res) => {

    let expRegText = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/; //only letters
    let expRegEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; //email
    let expRegCel = /^[0-9]{10}$/; //phone
    let expRegEge = /^[0-9]{2}$/;

    if (!expRegText.exec(req.body.name)) {
        return res.status(400).json({error: 'Name is required / only letters'} )
    
    }else if(!expRegEmail.exec(req.body.email)){
        return res.status(400).json({error: 'Email is required / insert valid email'} )
    
    }else if(!expRegCel.exec(req.body.phone)){
        return res.status(400).json({error: 'Phone is required / ten digit phone'} )
    
    }else if(!expRegEge.exec(req.body.age)){
        return res.status(400).json({error: 'Age is required / ten digit phone'} )
    
    }else if(req.body.gender != "Masculino" && req.body.gender != "Femenino" ){
        return res.status(400).json({error: 'Gender is required / options [Masculino/Femenino]'} )
    }

    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json({error: 'Email already exists'})
    }

    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    
    const user = new User();    
    user.name =  req.body.name
    user.email =  req.body.email
    user.phone =  req.body.phone
    user.password =  password
    user.age =  req.body.age
    user.gender =  req.body.gender
    user.hobby =  req.body.hobby
    user.registrationDate = new Date().getTime() 

    //Save and check error
    user.save(function (err) {
        if (err)
            res.json(err);

        res.json({
            message: "New User Added!",
            data: user
        });
    });    
};

exports.searchNameHobby = async (req, res) => {

    if(req.body.search == 'name'){    
        let val = req.body.value
        const newUser = await User.find({ name: val } );
        
        res.json({
            status: "success",
            data: newUser
        });

    }else{
        let val = req.body.value
        const newUser = await User.find({ hobby: val });

        res.json({
            status: "success",
            data: newUser
        });
    }

    

};

// Delete User
exports.delete = async (req, res) => {
    
    let id = req.params.id
    const userDelete =  await User.findById(id);

    if ( !userDelete ) {
        return res.status(400).json({error: 'ID does not exist'})
    }else{

        User.deleteOne({
            _id: req.params.id
        }, function (err, user) {
            if (err)
                res.send(err)
            res.json({
                status: "success",
                message: 'User Deleted'
            });
        });
    }
};

exports.userGroup = async (req, res) =>{
    
    let hoy = new Date();
    let dia = 1000 * 60 * 60 * 24 * 3;
    let oldDate = hoy.getTime() - dia; 
    let newDate = new Date(oldDate);
    console.log(newDate)         

    User.aggregate([
        {   $match: {
                $and:[ 
                    { age: {$gt: 18} },
                    { gender: 'Femenino'},
                    { registrationDate: {$gt: newDate} }
                ] 
            }
        },
        {
            $group: { 
                _id: '$hobby', 
                data: { $push: {_id: "$_id",name:"$name", phone:"$phone", hobby:"$hobby" } }}
        }
    ],
    function(err, user){
        if (err)
            res.send(err)
        res.json({
            status: "success",
            data: user
        });
    });

    /* User.find(
        { age: {$gt: 18},  gender: 'Femenino', registrationDate: {$gt: oldDate}},
        {name:1, phone:2, hobby:3, registrationDate:4},
    function(err, user){
        if (err)
            res.send(err)
        res.json({
            status: "success",
            data: user
        });
    }); */


};
