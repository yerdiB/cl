const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
});
const eventModel = new mongoose.model("Event", eventSchema);
module.exports = eventModel;