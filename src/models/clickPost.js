const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clickPostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
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