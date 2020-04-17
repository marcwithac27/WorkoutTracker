const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    type: {
        type: String
    },
    name: {
        type: String,
        trim: true,
        required: "YOu gotta tell me what you are doing Homie"
    },
    distance: Number,
    duration: {
        type: Number,
        required: "Tell the Truth how long did you do it for?",
    },
    weight: Number,
    reps: Number,
    sets: Number,
})