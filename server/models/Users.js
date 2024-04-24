const mongoose = require('mongoose');

//database schema conataining all user data including preferences and array of matches.
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    college: {
        type: String
    },
    sex: {
        type: String
    },
    age: {
        type: String
    },
    baseball: {
        type: Boolean
    },
    basketball: {
        type: Boolean
    },
    cycling: {
        type: Boolean
    },
    football: {
        type: Boolean
    },
    golf: {
        type: Boolean
    },
    tableTennis: {
        type: Boolean
    },
    tennis: {
        type: Boolean
    },
    running: {
        type: Boolean
    },
    soccer: {
        type: Boolean
    },
    volleyball: {
        type: Boolean
    },
    about: {
        type: String
    },
    url: {
        type: String
    },
    first_name: {
        type: String
    },
    matches: {
        type: Array
    }

});

const UserModel = mongoose.model("users", UserSchema);




module.exports = UserModel;