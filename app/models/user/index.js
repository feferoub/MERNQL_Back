const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      // lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

userSchema.statics = {
  signup: async function (args) {
    const user = await this.create({
      ...args,
      password: await bcrypt.hash(args.password, 10),
    });
    return jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1y",
    });
  },
  login: async function ({ userName, password, email }) {
    var user = await this.findOne({ userName });
    if (!user) {
      user = await this.findOne({ email });
    }
    if (!user) {
      throw new Error("No user with that userName");
    }
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Incorrect password");
    }

    return jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: `${1000 * 60 * 15}`,
    });
  },
};

module.exports = mongoose.model("User", userSchema);
