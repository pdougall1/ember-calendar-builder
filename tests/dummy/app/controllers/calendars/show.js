import Ember from 'ember';
import CalendarMixin from 'ember-calendar-builder/mixins/calendar-mixin';

export default Ember.Controller.extend(CalendarMixin, {
  queryParams: ['currentMonth'],
  currentMonth: '2015-01',
  someOptions: { hasNewEventButton: true },
  calendarDate: function () {
    return this.get('currentMonth');
  }.property('currentMonth'),

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
      var newMonth = moment(this.get('currentMonth'), 'YYYY-MM')
        .subtract(1, 'month')
        .format("YYYY-MM");

      this.transitionToRoute('calendars.show', {queryParams: {currentMonth: newMonth }});
    },

    nextMonth: function () {
      var newMonth = moment(this.get('currentMonth'), 'YYYY-MM')
        .add(1, 'month')
        .format("YYYY-MM");

      this.transitionToRoute('calendars.show', {queryParams: {currentMonth: newMonth }});
    },
  }

});
