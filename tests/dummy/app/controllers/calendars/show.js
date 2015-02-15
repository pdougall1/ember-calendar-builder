import Ember from 'ember';

export default Ember.Controller.extend({

  someDate: function () {
    return new Date;
  }.property()

});
