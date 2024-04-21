const mongoose = require('mongoose');

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