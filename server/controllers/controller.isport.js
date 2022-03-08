const sport = require("../models/model.isport");
const mongoose = require("mongoose");
const moment = require("moment");


module.exports.createevent = (req, res) => {
  sport
    .create(req.body)
    .then((app) => res.json(true))
    .catch((err) => res.status(400).json(err));
};

module.exports.addMember = (request, response) => {
  sport
    .findOneAndUpdate(
      { _id: request.params.id },
      { $addToSet: request.body },
      { new: true }
    )
    .then((data) => response.json(data))
    .catch((err) => response.json(err));
};

module.exports.pullMember = (request, response) => {
  sport
    .updateOne(
      { _id: request.params.id },
      { $pull: { eventMembers: request.params.user } },
      { new: true }
    )
    .then((data) => response.json(data))
    .catch((err) => response.json(err));
};

module.exports.geteventAll = (request, response) => {
  sport
    .find({})
    .sort({ createdAt: "descending" })
    .then((apps) => response.json(apps))
    .catch((err) => response.status(400).json(err));
};

module.exports.getevent = (req, res) => {
  sport
    .findById(req.params.id)
    .populate("eventOwner", "-password -createdAt -updatedAt -birthdate -__v")
    .populate("eventMembers", "-password -createdAt -updatedAt -birthdate -__v")
    .then((apps) => res.json(apps))
    .catch((err) => res.status(400).json(err));
};

module.exports.geteventToday = (request, response) => {
  const today = moment().startOf("day");

  sport
    .find({
      eventDate: {
        $gte: today.toDate(),
        $lte: moment(today).endOf("day").toDate(),
      }
    })
    .then((apps) => response.json(apps))
    .catch((err) => response.status(400).json(err));
};

module.exports.geteventTodayUser = (request, response) => {
  const today = moment().startOf("day");
  sport
    .find({
      eventMembers:request.params.id,
      eventDate: {
        $gte: today.toDate(),
        $lte: moment(today).endOf("day").toDate(),
      }
    })
    .then((apps) => response.json(apps))
    .catch((err) => response.status(400).json(err));
};

module.exports.geteventsByUser = (request,response) => {
  sport
  .find({eventMembers:request.params.id})
  .then((apps) => response.json(apps))
  .catch((err) => response.status(400).json(err));
}

module.exports.historyeventOwner = (request,response) =>{
  sport
  .find({eventOwner: request.params.id})
  .then((event) => response.json(event) )
  .catch((error) => response.status(400).json(err));
}