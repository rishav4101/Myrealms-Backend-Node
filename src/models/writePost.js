const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const writePostSchema = new Schema({
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
    likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "Users",
          },
        },
      ],
      comments: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "Users",
          },
          text: {
            type: String,
            required: true,
          },
          name: {
            type: String,
          },
          time:{
            type: Date,
          },
        },
      ],
});

//@ts-ignore
var writePost = mongoose.model("writePost", writePostSchema);
module.exports = writePost;