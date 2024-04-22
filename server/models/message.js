const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
        senderId: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "users",
           required: true
        },

        recieverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },

        message: {
            type: String,
            required: true,
        },
        //created at...
    },
        {timestamps: true}
);

const messageModel = mongoose.model("message", messageSchema);

module.exports = messageModel; 