const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: [18, "Not for {VALUE} year olds only 18+"],
    max: [100, "Isn't {VALUE} too old to be traveling?"],
  },
  looking: {
    type: String,
    required: true,
  },
  loc: {
    type: { type: String, required: true },
    coordinates: {
      type: [Number, Number],
      required: [true, "Enter a place"],
      validate: {
        validator: (array) => {
          let validate = array.filter((number) => {
            return Number(number);
          });
          return validate.length === 2 ? true : false;
        },
      },
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: [String],
    default: undefined,
  },
});

userSchema.index({ loc: "2dsphere" });
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
