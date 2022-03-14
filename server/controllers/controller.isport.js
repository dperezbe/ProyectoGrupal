const sport = require("../models/model.isport");
const chat = require("../models/model.chatevent");
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
    .findById(request.params.id )
    .then((data) => {
      if(data.eventMembers.length<data.eventMemberTotal)
      {
         sport
    .findOneAndUpdate(
      { _id: request.params.id },
      { $addToSet: request.body },
      { new: true }
    )
    .then((data) => response.json(data))
    .catch((err) => response.json(err));
      }
      else{
        response.json("full")
      }
    })
    .catch((err) => response.json(err));

  // sport
  //   .findOneAndUpdate(
  //     { _id: request.params.id },
  //     { $addToSet: request.body },
  //     { new: true }
  //   )
  //   .then((data) => response.json(data))
  //   .catch((err) => response.json(err));
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
    .populate("eventOwner", "-password -createdAt -updatedAt -birthdate -__v")
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
  .catch((err) => response.status(400).json(err));
}

module.exports.geteventFutureUser = (request, response) => {
  const today = moment().startOf("day");
  sport
    .find({
      eventMembers:request.params.id,
      eventDate: {
        $gte: moment(today).endOf("day").toDate()
      }
    })
    .then((apps) => response.json(apps))
    .catch((err) => response.status(400).json(err));
};

module.exports.chatnewmessage = (request, response) => {
  chat
  .create(request.body)
  .then((app) => response.json(true))
  .catch((err) => response.status(400).json(err));
};

module.exports.chatgetmessage = (request, response) => {
  chat
  .find({event:request.params.id})
  .populate("user", "-password -createdAt -updatedAt -birthdate -__v")
  .then((apps) => response.json(apps))
  .catch((err) => response.status(400).json(err));
};

module.exports.deleteevent = (request,response) =>{
  sport
  .findByIdAndDelete(request.params.id)
  .then((app) => response.json(true))
  .catch((err) => response.status(400).json(err));

}
