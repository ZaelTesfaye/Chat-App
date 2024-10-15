const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            min: 4,
            max: 20,
        },
        email: {
            type: String,
            unique: true,
            max: 50
        },
        password: {
            type: String,
            min: 8,
            max: 50
        },
        isAvatarImageSet: {
            type: Boolean,
            default: false
        },
        avatarImage: {
            type: String,
            default: ""
        }
    }
)
userSchema.plugin(findOrCreate);
module.exports = mongoose.model("users", userSchema);