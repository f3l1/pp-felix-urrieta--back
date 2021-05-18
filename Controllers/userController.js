//Import User Model
const User = require('../Models/users');

//For index
exports.index = function  (req, res) {
    User.get(function (err, User) {
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

exports.create = function (req, res) {
    console.log(req.body.name)

    /* const isEmailExist = User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            {error: 'Email ya registrado'}
        )
    } */
    /* const user = new User();    
    user.name =  req.body.name
    user.email =  req.body.email
    user.phone =  req.body.phone
    user.password =  req.body.password
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
    }); */
    res.json({
        message: "New User Added!",
        data: "all good"
    });
};