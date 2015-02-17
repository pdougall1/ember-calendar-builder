import Month from 'ember-calendar-builder/lib/month';

var Calendar = function () {
  this.months = {};

  this.showMe = function (monthKey) {
    var month = this.findOrCreate(monthKey);
    return month.makeViewable();
  };

  this.makeActive = function (dateKey) {
    var day = this.findDay(dateKey);
    day.active = true;
  };

  this.findDay = function (dateKey) {
    var date = moment(dateKey);
    var month = this.months[date.format('YYYY-MM')];
    return month.days[date.format('YYYY-MM-DD')];
  };


  // private

  this.findOrCreate = function (monthKey) {
    var month;
    month = this.months[monthKey];
    if (month) {
      return month;
    } else {
      month = new Month(monthKey).build();
      this.months[monthKey] = month;
      return month;
    }
  };
};

export default Calendar;
