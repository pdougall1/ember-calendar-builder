import Ember from 'ember';
import Calendar from 'ember-calendar-builder/lib/calendar';

export default Ember.Component.extend({

  init: function () {
    this.set('calendar', new Calendar());
    this._super();
  },

  currentMonthKey: function () {
    return moment(this.get('date')).format('YYYY-MM');
  }.property('date'),

  month: function () {
    var month = this.get('calendar').showMe(this.get("currentMonthKey"));
    return month;
  }.property(),

  actions: {
    makeDayActive: function (day) {
      this.calendar.makeActive(day.dateKey); 
      console.log('active');
      this.set('month', this.calendar.showMe(this.get('currentMonthKey')));
    }
  }

});
