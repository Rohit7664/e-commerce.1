const mongoose = require("mongoose");
const validator = require("validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keysecret = process.env.KEY;

const userShema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: String,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email  address");
      }
    },
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  carts: Array,
});

// password hashing
userShema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next;
});

// generating token

userShema.methods.generateAuthtoken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, keysecret, { expiresIn: "1d" });
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

//  add to cart data
userShema.methods.addcartdata = async function (cart) {
  try {
    this.carts = this.carts.concat(cart);
    await this.save();
    return this.carts;
  } catch (error) {
    console.log(error, "error in cart");
  }
};

const User = new mongoose.model("User", userShema);

module.exports = User;
