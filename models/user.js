const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true
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
        type: Number,
        min: [18, 'Not for {VALUE} year olds only 18+'],
        max: [100, "Isn't {VALUE} too old to be traveling?"]

    },
    date: { 
        type: Date,
        default: Date.now
    },
    loc: {
        type: { type: String,
        required: true },
        coordinates: {
            type: [Number, Number],
            required: [true, 'gimme place']
        }
    }
});

userSchema.index({loc:"2dsphere"})
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);