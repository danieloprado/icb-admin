const _ = require('lodash');
const Event = require('models/event');

const Service = {
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