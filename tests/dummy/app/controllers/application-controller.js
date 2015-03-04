import Ember from 'ember';

export default Ember.Controller.extend({

  startDate: function () {
    return moment('2015-01-01');
  }.property()

});
