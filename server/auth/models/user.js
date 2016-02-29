const _ = require('lodash');

module.exports = function User() {

  this.hasRoles = function() {
    const roles = _.flattenDeep(arguments);
    return _.intersection(roles, this.roles).length > 0;
  };

};