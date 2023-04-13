const mongoose = require("mongoose");

const MessagesSchema = mongoose.Schema(
  {
    sent_by: {
      type: mongoose.Types.ObjectId,
      required: true,
      index: true,
    },
    sent_to: {
      type: String,
      required: true,
      index: true,
    },
    message: {
      type: String,
      required: true,
    },
    sent_at: {
      type: Date,
      default: function () {
        return new Date().toISOString();
      },
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    is_edit: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("messages", MessagesSchema);
