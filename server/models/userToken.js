const _ = require('lodash');

module.exports = function UserToken() {

  this.hasRoles = function() {
    const roles = _.flattenDeep(arguments);
    return _.intersection(roles, this.roles).length > 0;
  };

};