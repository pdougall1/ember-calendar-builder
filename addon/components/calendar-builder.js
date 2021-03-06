// Right now events have to be ember objects with a beginTime and an endTimeKey
// This is because we have to access times on the event
// The solution we should move to is to have that be the default accessor,
// but allow a beginTimeAccessor and endTimeAccessor in the options


import Ember from 'ember';

export default Ember.Component.extend({

  defaultOptions: {
    hasNewEventButton: false
  },

  init: function () {
    var calendar = this.get('calendar');
    if (calendar) {
      this.applyOptions();
      this._super();
    } else {
      console.log('You do not currently have a calendar set.  This is probably because you have not included the CalendarMixin in your controller.');
      console.log('Make sure you import CalendarMixin and extend from it in the controller.');
    }
  },

  applyOptions: function () {
    var _this = this;
    var givenOptions = this.get('options');
    var defs = this.get('defaultOptions');
    var options = $.extend(defs, givenOptions);
    Object.keys(options).forEach(function (optionKey) {
      _this[optionKey] = options[optionKey];
    });
  },

  getCurrentMonthFromDate: function (date) {
    return moment(date + '-01');
  },

  currentMonth: function () {
    var date = this.getCurrentMonthFromDate(this.get('date'));
    console.log('date changed : ' + date + ' -and- ' + moment(date).format('YYYY-MM'));
    return moment(date).startOf('month');
  }.property('date'),

  currentMonthKey: function () {
    return moment(this.get('currentMonth')).format('YYYY-MM');
  }.property('currentMonth'),

  currentMonthFormatted: function () {
    return moment(this.get('currentMonth')).format('MMMM YYYY');
  }.property('currentMonth'),

  month: function () {
    return this.get('calendar').showMe(this.get("currentMonthKey"));
  }.property('currentMonthKey', 'calendar.eventCount'),

  actions: {
    makeDayActive: function (day) {
      this.calendar.makeActive(day.dateKey); 
      this.set('month', this.calendar.showMe(this.get('currentMonthKey')));
    },

    newEvent: function (day) {
      this.sendAction('newEvent', day);
    },

    previousMonth: function () {
      this.sendAction('previousMonth');
    },

    nextMonth: function () {
      this.sendAction('nextMonth');
    }
  }

});
