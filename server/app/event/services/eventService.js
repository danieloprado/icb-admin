const _ = require('lodash');
const Event = require('models/event');

const Service = {
  list: churchId => Event.find({
    churchId: churchId,
    dates: {
      $elemMatch: {
        beginDate: {
          $gte: new Date()
        }
      }
    }
  }).sort("dates.beginDate"),

  next: churchId => Event.findOne({
    churchId: churchId,
    dates: {
      $elemMatch: {
        beginDate: {
          $gte: new Date()
        }
      }
    }
  }).sort("dates.beginDate")
};

module.exports = Service;