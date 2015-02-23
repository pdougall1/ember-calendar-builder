import Month from 'ember-calendar-builder/lib/month';

var Calendar = function (initialMonthKey) {
  this.months = {};
  this.eventCount = 0;

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
    var startTime = moment(event.get('startTime'));
    var endTime = moment(event.get('endTime'));

    this.getAllDaysBetween(startTime, endTime).forEach(function (date) {
      calendar.findOrCreate(calendar.getMonthKey(date)); // first make sure the month exists
      calendar.findDay(calendar.getDateKey(date)).addEvent(event);
      calendar.incrimentEventCount();
    });
  };

  this.removeEvent = function (event) {
    var calendar = this;
    var startTime = moment(event.get('startTime'));
    var endTime = moment(event.get('endTime'));

    this.getAllDaysBetween(startTime, endTime).forEach(function (date) {
      calendar.findDay(calendar.getDateKey(date)).removeEvent(event);
      calendar.decrimentEventCount();
    });
  };


  // private

  // this could be DRYed up
  this.incrimentEventCount = function () {
    var initial = this.eventCount;
    this.eventCount = initial + 1;
    if (this.component) {
      this.component.set('eventCount', initial + 1);
    }
  };

  this.decrimentEventCount = function () {
    var initial = this.eventCount;
    this.eventCount = initial - 1;
    if (this.component) {
      this.component.set('eventCount', initial - 1);
    }
  };

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

  this.getAllDaysBetween = function (startTime, endTime) {
    startTime = moment(startTime);
    endTime = moment(endTime);
    var dates = [startTime];
    while (startTime.format('YYYY-MM-DD') <= endTime.format("YYYY-MM-DD")) {
      console.log(moment(startTime) + "____" + moment(endTime));
      dates.push(moment(startTime));
      startTime.add(1, 'day');
    }
    
    return dates;
  };

  this.getMonthKey = function (date) {
    return moment(date).format('YYYY-MM');
  };

  this.getDateKey = function (date) {
    return moment(date).format('YYYY-MM-DD');
  };

  this.findOrCreate(initialMonthKey);

};

export default Calendar;
