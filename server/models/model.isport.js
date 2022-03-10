const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("../models/model.user");

var schemaEvents = mongoose.Schema(
  {
    eventOwner: {
      type: Schema.Types.ObjectId,
      require: [true, "owner is required"],
      ref: "User"
    },
    eventName: {
      type: String,
      require: [true, "Nombre del evento es requerido"],
      minlength: [5, "El evento debe tener minimo 5 caracteres"],
    },
    eventLocation: {
      type: String,
      require: [true, "Debe ingresar una localización del evento"],
    },
    eventCategory: {
      type: String,
      require: [true, "Debe ingresar una categoria"],
    },
    eventMemberTotal: {
      type: Number,
      require: [true, "Ingrese el total de miembros"],
    },
    eventDate: {
      type: Date,
      require: [true, "Día del evento es requerido"],
    },
    eventDescripcion: {
      type: String
    },
    eventMembers: [{ 
      type: Schema.Types.ObjectId, 
      ref: "User"
      }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("isport_events", schemaEvents);
