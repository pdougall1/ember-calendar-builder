import Ember from 'ember';

export default Ember.Controller.extend({

  someDate: function () {
    return '2000-01-01';
  }.property(),

  someOptions: function () {
    return { hasNewEventButton: true };
  }.property(),

  actions: {
    newEvent: function (day) {
      var event = this.store.createRecord('event', {
        beginTime: day.date.toDate(),
        endTime: day.date.toDate(),
        name: "example event"
      });
      this.get('events').pushObject(event);
    }
  }

});
