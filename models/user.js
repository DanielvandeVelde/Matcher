const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema(
    {
    name: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    age: {
        type: Number
    },
    date: { 
        type: Date,
        default: Date.now
    }
},{strict: false});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);