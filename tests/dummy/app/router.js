import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('calendars', function () {
    this.route('show');
  });
});

export default Router;
