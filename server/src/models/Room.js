const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const RoomSchema = mongoose.Schema(
  {
    room_name: {
      type: String,
      required: [true, "room_name is required field"],
    },
    password: {
      type: String,
      required: [
        function () {
          return !this.is_public;
        },
        "password is required filed because the room is private",
      ],
      default: null,
    },
    room_code: {
      type: String,
      unique: true,
      default: function () {
        return uuidv4();
      },
    },
    is_public: {
      type: Boolean,
      required: [true, "is_public is required field"],
    },
    created_by: {
      type: mongoose.Types.ObjectId,
      required: [true, "created_by is required field"],
      ref: "users",
    },
    room_users: [
      {
        user_id: mongoose.Types.ObjectId,
        is_admin: {
          type: Boolean,
          default: false,
        },
        is_active: Boolean,
      },
    ],
  },
  { timestamps: true }
);

RoomSchema.index({ room_name: "text", room_code: "text" });

module.exports = mongoose.model("rooms", RoomSchema);
