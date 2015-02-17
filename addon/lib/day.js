var Day = function (dateKey, options) {
  
  if (options) {
    this.handleOptions = function (options) {
      var _this = this;
      Object.keys(options).forEach(function (key) {
        _this[key] = options[key];
      });
    };
    this.handleOptions(options);
  }

  this.dateKey = dateKey;
  this.active = false;
};

export default Day;
