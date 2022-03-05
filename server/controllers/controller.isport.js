const sport = require('../models/model.isport');
const member = require('../models/model.isport_member');
const mongoose = require('mongoose');

module.exports.createevent = (req,res) => {

    req.body._id = new mongoose.Types.ObjectId();

    sport
    .create(req.body)
    .then((app) => app)
    .catch((err) => res.status(400).json(err));


    member
    .create(req.body)
    .then((app) => app)
    .catch((err) => res.status(400).json(err));

     return res.json(true);
}

module.exports.getevent = (req,res) => {
    sport
    .findById(req.params.id)
    .populate('user','-password -createdAt -updatedAt -birthdate')
    .then((apps) => res.json(apps))
    .catch((err) => res.status(400).json(err))
}


module.exports.getMembers = (req,res) => {
    member
    .findById(req.params.id)
    .populate('Members','-password -createdAt -updatedAt -__v ')
    .then((app) => res.json(app))
    .catch((err) => res.status(400).json(err));
}

module.exports.addMember = (request, response) => {
    member
      .findOneAndUpdate(
        { _id: request.params.id },
        { $addToSet: request.body },
        { new: true }
      )
      .then((data) => response.json(data))
      .catch((err) => response.json(err));
  };
