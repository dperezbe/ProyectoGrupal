const mongoose = require("mongoose");
const { Schema } = mongoose;

var schemaEvents = mongoose.Schema(
  {
    EventId :{
      type: mongoose.Types.ObjectId
    },
    Descripcion: {
      type: String
    },
    Members: [{ 
      type: Schema.Types.ObjectId, 
      ref: "User"
      }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("isport_member", schemaEvents);
