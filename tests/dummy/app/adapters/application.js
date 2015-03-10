import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({
  host: 'https://ember-calendar-builder-server.herokuapp.com/'
});