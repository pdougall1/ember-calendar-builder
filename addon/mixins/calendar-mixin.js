import Ember from 'ember';
import Calendar from 'ember-calendar-builder/lib/calendar';

export default Ember.Mixin.create({

  init: function () {
    this._super();
    this.set('calendar', new Calendar(this.get('calendarDate')));
  },

  calendarAddEvent: function (event) {
    this.get('calendar').addEvent(event);
  },

  calendarAddEvents: function (events) {
    var _this = this;
    events.forEach( function (event) {
      _this.calendarAddEvent(event);
    });
  },

  calendarRemoveEvent: function(event) {
    this.get('calendar').removeEvent(event);
  },

  calendarRemoveEvents: function(events) {
    var _this = this;
    events.forEach( function (event) {
      _this.calendarRemoveEvent(event);
    });
  }

});
