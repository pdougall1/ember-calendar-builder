import Ember from 'ember';
import Calendar from 'ember-calendar-builder/lib/calendar';

export default Ember.Component.extend({

  defaultOptions: {
    hasNewEventButton: false
  },
  
  init: function () {
    var chosenDate = this.get('chosenDate');
    var calendar = new Calendar(moment(chosenDate).format('YYYY-MM'));
    calendar.toggleChosen(moment(chosenDate).format('YYYY-MM-DD'));
    this.set('calendar', calendar);
    this.applyOptions();
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
    return moment(this.get('chosenDate')).startOf('month');
  }.property('chosenDate'),

  currentMonthKey: function () {
    return moment(this.get('currentMonth')).format('YYYY-MM');
  }.property('currentMonth'),

  currentMonthFormatted: function () {
    return moment(this.get('currentMonth')).format('MMMM YYYY');
  }.property('currentMonth'),

  month: function () {
    return this.get('calendar').showMe(this.get("currentMonthKey"));
  }.property('currentMonthKey', 'monthTriggar'),

  dateChanged: function () {
    this.calendar.toggleChosen(moment(this.get('chosenDate')).format('YYYY-MM-DD'));
    this.triggarMonth();
  }.observes('chosenDate'),

  monthTriggar: 0,

  triggarMonth: function () {
    var t = this.get('monthTriggar');
    this.set('monthTriggar', t + 1);
  },

  actions: {
    toggleChosenDay: function (day) {
      this.sendAction('chooseDate', day.date)
    },

    previousMonth: function () {
      var newMonth = moment(this.get('currentMonth'), 'YYYY-MM')
        .subtract(1, 'month')
        .format("YYYY-MM");
      this.set('currentMonth', newMonth);
    },

    nextMonth: function () {
      var newMonth = moment(this.get('currentMonth'), 'YYYY-MM')
        .add(1, 'month')
        .format("YYYY-MM");
      this.set('currentMonth', newMonth);
    }
  }

});
