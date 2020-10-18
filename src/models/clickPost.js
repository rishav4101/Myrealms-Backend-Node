const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clickPostSchema = new Schema({
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
    time:{
        type: Date,
    },
});

//@ts-ignore
const clickPost = mongoose.model("clickPost", clickPostSchema);
module.exports = clickPost;