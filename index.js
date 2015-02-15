module.exports = {
  name: 'ember-calendar-builder',

  included: function(app) {
    this._super.included(app);

    app.import('bower_components/moment/moment.js');
  }
};
