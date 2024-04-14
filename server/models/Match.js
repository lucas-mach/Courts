const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    user : {
        type: Object,
    }

});

const MatchModel = mongoose.model("match", MatchSchema);


module.exports = MatchModel;