import DS from 'ember-data';

export default DS.Model.extend({

  name:       DS.attr('string'),
  beginTime:  DS.attr('date'),
  endTime:    DS.attr('date')
  
});
