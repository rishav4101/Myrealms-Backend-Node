const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artPostSchema = new Schema({
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
    img: 
    { 
        data: Buffer, 
        contentType: String 
    }
});

const artPost = mongoose.model("artPost", artPostSchema);
module.exports = artPost;