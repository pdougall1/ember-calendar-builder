import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    currentMonth: {
      refreshModel: true
    }
  },

  model: function () {
    return this.store.find('event');
  },

  setupController: function (controller, model) {
    controller.set('calendarEvents', model);
  }

});
