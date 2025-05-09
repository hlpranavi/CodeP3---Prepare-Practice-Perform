
const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    Difficulty: {
        type: String,
        required: true
    },
    Platform: {
        type: String,
        required: true
    },
    Problem_Link: {
        type: String,
        required: true
    },
    Problem_name: {
        type: String,
        required: true
    },
    Skill: {
        type: String,
        required: true
    },
    Topic: {
        type: String,
        required: true
    }
}); 

module.exports = mongoose.model('Data', DataSchema);
