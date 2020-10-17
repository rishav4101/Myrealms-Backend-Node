import mongoose from "mongoose";

const clickPostSchema = new mongoose.Schema({
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
const clickPost = mongoose.model("clickPost", clickPostSchema);
module.exports = clickPost;