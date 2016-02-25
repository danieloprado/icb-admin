const _ = require('lodash');
const Event = require('event/models/event');

var Service = {
  findOne: query => Event.findOne(query || {}),

  list: query => Event.find(query || {}),

  create: (obj, user) => {
    const event = new Event(obj);
    event.church = user.church._id;
    return event.save();
  },

  update: (obj) =>
    Event.findOne({
      _id: obj._id
    })
    .then(event => {
      if (!event) throw "Not found";

      _.assignIn(event, obj);
      return event.save();
    }),

  remove: (event) => Event.remove({
    _id: event._id
  })

};

module.exports = Service;