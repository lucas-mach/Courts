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
    football: {
        type: Boolean,
        required: true,
    },
    basketball: {
        type: Boolean,
        required: true,
    },
    tennis: {
        type: Boolean,
        required: true,
    }


});

const UserModel = mongoose.model("users", UserSchema);


module.exports = UserModel;