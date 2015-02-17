import Ember from 'ember';

export default Ember.Controller.extend({

  someDate: function () {
    return '2000-01-01';
  }.property()

});
