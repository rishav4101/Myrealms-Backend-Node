const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const writePostSchema = new Schema({
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
var writePost = mongoose.model("writePost", writePostSchema);
module.exports = writePost;