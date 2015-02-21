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
    return month.days[this.getDateKey(date)];
  };

  this.addEvent = function (event) {
    var calendar = this;
    var beginTime = moment(event.get('beginTime'));
    var endTime = moment(event.get('endTime'));

    this.getAllDaysBetween(beginTime, endTime).forEach(function (date) {
      calendar.findDay(calendar.getDateKey(date)).addEvent(event);
    });
  };

  this.removeEvent = function (event) {
    var calendar = this;
    var beginTime = moment(event.get('beginTime'));
    var endTime = moment(event.get('endTime'));

    this.getAllDaysBetween(beginTime, endTime).forEach(function (date) {
      calendar.findDay(calendar.getDateKey(date)).removeEvent(event);
    });
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

  this.getAllDaysBetween = function (beginDate, endDate) {
    beginDate = moment(beginDate);
    endDate = moment(endDate);
    var dates = [beginDate];
    while (beginDate.format('YYYY-MM-DD') !== endDate.format("YYYY-MM-DD")) {
      dates.push(moment(beginDate));
      beginDate.add(1, 'day');
    }
    return dates;
  };

  this.getDateKey = function (date) {
    return moment(date).format('YYYY-MM-DD');
  };

};

export default Calendar;
