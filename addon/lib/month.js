import Day from 'ember-calendar-builder/lib/day';

var Month = function (monthKey) {
  this.monthKey = monthKey;

  this.build = function () {
    var days = this.buildDays(this.monthKey);
    this.days = days;
    return this;
  };

  this.makeViewable = function () {
    var monthKey = this.monthKey;
    var _month = {};
    var guideDate = this.firstDayOfFirstWeek(monthKey);
    var stopDate = this.lastDayOfLastWeek(monthKey).add(1, 'day');

    while (this.datesAreNotEqual(guideDate, stopDate)) {
      var weekKey = this.getWeekKey(guideDate);
      var dateKey = moment(guideDate).format('YYYY-MM-DD');
      var day = this.days[dateKey];
      if (!day) { day = new Day(dateKey) }
      if (_month[weekKey]) {
        _month[weekKey].push(day);
      } else {
        _month[weekKey] = [day];
      }
      guideDate = guideDate.add(1, 'day');
    }
    
    return Object.keys(_month).map(function (weekKey) {
      return _month[weekKey];
    });
  };


  // private

  this.buildDays = function (monthKey) {
    var guideDate = moment(monthKey + "-1");
    var stopDate = moment(guideDate).endOf('month').add(1, 'day');
    var days = {};
    while (this.datesAreNotEqual(guideDate, stopDate)) {
      var dateKey = this.getDateKey(guideDate);
      days[dateKey] = new Day(dateKey, { inCurrentMonth: true });
      guideDate = guideDate.add(1, 'day');
    }
    return days;
  };

  this.firstDayOfFirstWeek = function (monthKey) {
    return moment(monthKey + "-01").startOf('week');
  };

  this.lastDayOfLastWeek = function (monthKey) {
    return moment(monthKey + "-01").endOf('month').endOf('week');
  };

  this.datesAreNotEqual = function (guideDate, stopDate) {
    return moment(guideDate).format('YYYY-MM-DD') !== moment(stopDate).format('YYYY-MM-DD');
  };

  this.getWeeksInMonth = function (monthKey) {
    return [moment(monthKey)];
  };

  this.getDateKey = function (date) {
    return moment(date).format('YYYY-MM-DD');
  };

  this.getWeekKey = function (date) {
    // much of this is a hacky way to get around the previous year problem
    // suggestions for a better way to handle it are welcome :)
    var yearMonthBelongsTo = parseInt(this.monthKey.split('-')[0]);
    if (moment(date).year() < yearMonthBelongsTo) {
      date = moment(date).year(yearMonthBelongsTo);
    }
    var weekNum = moment(date).week();
    if (weekNum === 53) { weekNum = 1 }; // handles that rare occasion when there are more weeks in the year
    return moment(date).format('YYYY-') + weekNum;
  };
};

export default Month;
