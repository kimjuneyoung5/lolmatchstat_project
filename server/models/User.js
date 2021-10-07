const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "{PATH} must be present"],
        unique: true
    },
    region: {
        type: String,
        required: [true, "{PATH} must be present"]
    },
    like : {
        type: Boolean,
        default: false
    }
},{timestamps: true});

// make the schema and export
const User = mongoose.model("User", UserSchema);
module.exports = User;