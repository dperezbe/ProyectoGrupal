const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("../models/model.user");

var schemaEvents = mongoose.Schema(
  {
    EventSport: {
      type: String,
      require: [true, "Nombre del evento es requerido"],
      minlength: [5, "El evento debe tener minimo 5 caracteres"],
    },
    Location: {
      type: String,
      require: [true, "Debe ingresar una localización del evento"],
    },
    MemberSubs: {
      type: Number,
    },
    MemberFull: {
      type: Number,
      require: [true, "Ingrese el total de miembros"],
    },
    DateEvent: {
      type: Date,
      require: [true, "Día del evento es requerido"],
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("isport_events", schemaEvents);
