const mongoose = require("mongoose");

const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is required field"],
      unique: true,
      validate: (value) => {
        if (!value.match(email_regex)) {
          throw new Error("enter valid email address");
        }
      },
    },
    display_name: {
      type: String,
      required: [true, "display_name is required field"],
    },
    password: {
      type: String,
      required: [true, "password is required field"],
    },
    access_token: {
      type: String,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("users", UserSchema);
