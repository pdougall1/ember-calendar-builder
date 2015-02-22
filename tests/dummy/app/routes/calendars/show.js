import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function (controller) {
    var events, ordinals, i, today;
    events = [];
    ordinals = ['first', 'second'];
    today = new Date();

    for (i = 0; i < ordinals.length; i++) {
      events.pushObject(this.store.createRecord('event', {
        beginTime: moment('2000-01-01').add(i, 'day').toDate(),
        endTime: moment('2000-01-01').add(i, 'day').toDate(),
        name: ordinals[i] + " event"
      }));      
    }
    controller.calendarAddEvents(events);
  }

});
