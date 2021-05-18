var mongoose = require('mongoose');

//schema
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hobby: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Export User Model
var User = module.exports = mongoose.model('User', userSchema);

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit); 
}