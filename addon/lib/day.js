var Day = function (dateKey, options) {
  this.dateKey = dateKey;
  this.default_options = {
    active: false,
    inCurrentMonth: false
  };

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
    this.events = {};
  };

  this.addEvent = function (event) {
    this.events[this.getEventKey(event)] = event;
  };

  this.getEventKey = function (event) {
    var beginUnix, endUnix, id;
    beginUnix = moment(event.get('beginDate')).unix();
    endUnix = moment(event.get('endDate')).unix();
    id = event.get('id');
    return id + "_" + beginUnix + "_" + endUnix;
  };

  this.handleOptions();
  this.build();
};

export default Day;
