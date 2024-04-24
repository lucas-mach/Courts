const mongoose = require('mongoose');

//database schema. Contains both users and an array of messages between them.
const chatSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            },
        ],

        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "message",
                default: [],
            },
        ],
    },
    {timestamps: true}
);

const chatModel = mongoose.model("chat", chatSchema);

module.exports = chatModel;