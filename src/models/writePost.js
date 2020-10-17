import mongoose from "mongoose";

const writePostSchema = new mongoose.Schema({
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

//@ts-ignore
var writePost = mongoose.model("writePost", writePostSchema);
module.exports = writePost;