import Ember from 'ember';
import Calendar from 'ember-calendar-builder/lib/calendar';

export default Ember.Mixin.create({

  init: function () {
    this._super();
    var calendarDate = this.get('calendarDate');
    if (calendarDate) {
      this.set('calendar', new Calendar(calendarDate));
    } else {
      console.log('Make sure you set a calendarDate on your controller.');
    }
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
