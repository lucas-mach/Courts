const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        
    },
    age: {
        type: String,
       
    },
    football: {
        type: Boolean,
        
    },
    basketball: {
        type: Boolean,
        
    },
    tennis: {
        type: Boolean,
        
    },
    about: {
        type: String,

    },
    url: {
        type: String
    },
    first_name: {
        type: String
    },

});

const UserModel = mongoose.model("users", UserSchema);


module.exports = UserModel;