var Day = function (dateKey, options) {
  this.dateKey = dateKey;
  this.default_options = {
    active: false,
    inCurrentMonth: false
  }

  this.options = $.extend(this.default_options, options);

  this.handleOptions = function () {
    var _this = this;
    var options = this.options;
    Object.keys(options).forEach(function (key) {
      _this[key] = options[key];
    });
  };

  this.build = function () {
    var date = moment(this.dateKey);
    this.date = date;
    this.ofMonth = date.format('D');
  };

  this.handleOptions();
  this.build();
};

export default Day;
