const ModulesRegister = () => {
  this.register = (name, instance) => {
    this[name] = require(instance);
  };

  return this;
};

module.exports = ModulesRegister();