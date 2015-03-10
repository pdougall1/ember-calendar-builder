import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    currentMonth: {
      refreshModel: true
    }
  },

  model: function (params) {
    return this.store.find('event', params);
  },

  setupController: function (controller, model) {
    controller.set('calendarEvents', model);
  }

});
