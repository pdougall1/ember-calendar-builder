import Ember from 'ember';
import CalendarMixin from 'ember-calendar-builder/mixins/calendar-mixin';

export default Ember.Controller.extend(CalendarMixin, {
  calendarDate: '2000-01-01',
  someOptions: { hasNewEventButton: true },

  actions: {
    newEvent: function (day) {
      var event = this.store.createRecord('event', {
        beginTime: day.date.toDate(),
        endTime: day.date.toDate(),
        name: "example event"
      });
      this.calendarAddEvent(event);
    },

    previousMonth: function () {
      console.log('go to previousMonth');
    },

    nextMonth: function () {
      console.log('go to nextMonth');
    }
  }

});
