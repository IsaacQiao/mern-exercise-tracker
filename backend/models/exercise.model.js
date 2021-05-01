const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const excerseSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Exercise = mongoose.model('Exercise', excerseSchema);

module.exports = Exercise;