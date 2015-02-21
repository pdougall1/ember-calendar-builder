import Ember from 'ember';
import Day from 'ember-calendar-builder/lib/day';

var day = new Day('2015-06-15');

test('a day has a dateKey', function (assert) {
  assert.equal(day.dateKey, '2015-06-15');
});

test('a day defaults to not being active', function (assert) {
  assert.equal(day.active, false);
});

test('a day defaults to being inCurrentMonth', function (assert) {
  assert.equal(day.inCurrentMonth, false);
});

test('a day knows what day of the month it is on', function (assert) {
  assert.equal(day.ofMonth, 15);
});

test("a day knows it's date", function (assert) {
  assert.equal(day.date.format('YYYY-MM-DD'), '2015-06-15');
});

test("a day can add an event", function (assert) {
  var params = { beginTime: moment('2015-06-01 09:30'), 
                 endTime: moment('2015-06-01 11:30'), 
                 id: 1234 };
  
  var anEvent = Ember.Object.create( params );
  var eventKey = day.getEventKey(anEvent);

  day.addEvent(anEvent);
  assert.equal(day.events[eventKey].get('id'), anEvent.get('id'));
});

test('a day can remove an event', function (assert) {
  var params = { beginTime: moment('2015-06-01 09:30'), 
                 endTime: moment('2015-06-01 11:30'), 
                 id: 1234 };
  
  var anEvent = Ember.Object.create( params );
  var eventKey = day.getEventKey(anEvent);

  day.addEvent(anEvent);
  assert.equal(day.events[eventKey].get('id'), anEvent.get('id'));

  day.removeEvent(anEvent);
  assert.equal(day.events[eventKey], null);  
});