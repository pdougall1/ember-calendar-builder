import Ember from 'ember';
import CalendarMixin from 'ember-calendar-builder/mixins/calendar-mixin';

export default Ember.Controller.extend(CalendarMixin, {
  queryParams: ['currentMonth'],
  someOptions: { hasNewEventButton: true },

  startDate: function () {
    return moment('2015-01-05');
  }.property(),

  currentMonth: function () {
    return moment(new Date()).format('YYYY-MM');
  }.property(),
  
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

    chooseDate: function (date) {
      this.set('startDate', moment(date));
    }
  }

});
