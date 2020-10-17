const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artPostSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
});


const artPost = mongoose.model("artPost", artPostSchema);
module.exports = artPost;