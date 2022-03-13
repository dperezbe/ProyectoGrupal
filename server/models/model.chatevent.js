const mongoose = require("mongoose");
const { Schema } = mongoose;

var schemaChat = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    event: {
        type: Schema.Types.ObjectId,
      },
    message: {
      type: String
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("chat_event", schemaChat);
