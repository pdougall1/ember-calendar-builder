// Right now events have to be ember objects with a beginTime and an endTimeKey
// This is because we have to access times on the event
// The solution we should move to is to have that be the default accessor,
// but allow a beginTimeAccessor and endTimeAccessor in the options


import Ember from 'ember';
import Calendar from 'ember-calendar-builder/lib/calendar';

export default Ember.Component.extend({

  defaultOptions: {
    hasNewEventButton: false
  },

  init: function () {
    var events = this.get('events');
    this.set('calendar', new Calendar(this.get('currentMonthKey')));
    this.applyOptions();
    this.addEvents(events);
    this.set('eventsLength', events.get('length'));
    this._super();
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

  currentMonth: function () {
    return moment(this.get('date')).startOf('month');
  }.property('date'),

  currentMonthKey: function () {
    return moment(this.get('currentMonth')).format('YYYY-MM');
  }.property('currentMonth'),

  currentMonthFormatted: function () {
    return moment(this.get('currentMonth')).format('MMMM YYYY');
  }.property('currentMonth'),

  month: function () {
    return this.get('calendar').showMe(this.get("currentMonthKey"));
  }.property('currentMonthKey', 'eventsChangeNotifier'),

  actions: {
    makeDayActive: function (day) {
      this.calendar.makeActive(day.dateKey); 
      this.set('month', this.calendar.showMe(this.get('currentMonthKey')));
    },

    newEvent: function (day) {
      this.sendAction('newEvent', day);
    },

    removeEvent: function (event) {
      // This will be a little harder because we don't know which event is being removed
    }
  },

  // private

  eventsChangeNotifier: 0,
  updateCalendarIfEventAdded: function () {
    var oldLength = this.get('eventsLength');
    var newLength = this.get('events.length');
    if (newLength > oldLength) {
      this.get('calendar').addEvent(this.get('events.lastObject'));
    }
    var notifier = this.get('eventsChangeNotifier')
    this.set('eventsChangeNotifier', notifier += 1);
  }.observes('events.length'),

  addEvents: function (events) {
    var calendar = this.get('calendar');
    events.forEach(function (event) {
      // should actually pass in accessor functions for begin and end times
      calendar.addEvent(event); 
    });
  }

});
