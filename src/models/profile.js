const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        unique: true,
    },
    fullname:{
        type: String,
    },
    bio: {
        type: String,
    },
    img: {
        type: String,
    }
});

//@ts-ignore
const profile = mongoose.model("profile", profileSchema);
module.exports = profile;

