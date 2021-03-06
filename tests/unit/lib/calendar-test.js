import Ember from 'ember';
import Calendar from 'ember-calendar-builder/lib/calendar';

var calendar = new Calendar();
var monthKey = "2015-06";

// #showMe
test('shows the correct number of weeks', function (assert) {
  assert.equal(calendar.showMe(monthKey).length, 5);
});

test('all weeks in all months have 7 days', function (assert) {
  var monthNum = 0;

  var incriment = function (week) {
    if (week.length === 7 ) {
      countWith7Days += 1;
    }    
  };

  while (monthNum < 12) {
    var viewableMonth = calendar.showMe('2015-' + monthNum);
    var countWith7Days = 0;
    viewableMonth.forEach(incriment);
    assert.equal(countWith7Days, viewableMonth.length);
    monthNum = monthNum + 1;
  }
});

test('a calendar can make a day active', function (assert) {
  calendar.showMe('2015-06');
  var day = calendar.findDay('2015-06-15');
  assert.equal(day.active, false);

  calendar.makeActive('2015-06-15');
  assert.equal(day.active, true);
});

test('a calendar can get all days between two dates when they are the same date', function (assert) {
  var days = calendar.getAllDaysBetween(moment('2015-06-01'), moment('2015-06-01'));
  var _days = days.map(function (day) { return moment(day).format('YYYY-MM-DD'); });
  assert.deepEqual(_days, ["2015-06-01"]);
});

test('a calendar can get all days between two dates', function (assert) {
  var days = calendar.getAllDaysBetween(moment('2015-06-01'), moment('2015-06-08'));
  var _days = days.map(function (day) { return moment(day).format('YYYY-MM-DD'); });
  assert.deepEqual(_days,["2015-06-01", "2015-06-02", "2015-06-03", "2015-06-04", "2015-06-05", "2015-06-06", "2015-06-07", "2015-06-08"]);
});


test('a calendar can add an event that is on a single day', function (assert) {
  var params = { beginTime: moment('2015-06-01 09:30'), 
                 endTime: moment('2015-06-01 11:30'), 
                 id: 1234 };
  
  var anEvent = Ember.Object.create( params );
  calendar.showMe('2015-06');
  calendar.addEvent(anEvent);
  var dayWithEvent = calendar.findDay('2015-06-01');

  assert.equal(Object.keys(dayWithEvent.events).length, 1);
});

test('a calendar can remove an event on a single day', function (assert) {
  var params = { beginTime: moment('2015-06-01 09:30'), 
                 endTime: moment('2015-06-01 11:30'), 
                 id: 1234 };
  var dayKey = '2015-06-01';
  var anEvent = Ember.Object.create( params );
  calendar.showMe('2015-06');
  var dayWithEvent = calendar.findDay(dayKey);
  assert.equal(Object.keys(dayWithEvent.events).length, 1);

  calendar.removeEvent(anEvent);
  assert.equal(dayWithEvent.events[dayWithEvent.getEventKey(anEvent)], null);
});

test('a calendar when adding an event that spans multiple days adds it to each day', function (assert) {
  var params = { beginTime: moment('2015-06-11 09:30'), 
                 endTime: moment('2015-06-14 11:30'), 
                 id: 1234 };

  var anEvent = Ember.Object.create( params );
  calendar.showMe('2015-06');
  calendar.addEvent(anEvent);

  var dayOne = calendar.findDay('2015-06-11');
  assert.equal(Object.keys(dayOne.events).length, 1);

  var dayTwo = calendar.findDay('2015-06-12');
  assert.equal(Object.keys(dayTwo.events).length, 1);

  var dayThree = calendar.findDay('2015-06-13');
  assert.equal(Object.keys(dayThree.events).length, 1);

  var dayFour = calendar.findDay('2015-06-14');
  assert.equal(Object.keys(dayFour.events).length, 1);
});

test('a calendar when adding an event that spans multiple days does not add it to spanning days', function (assert) {
  var params = { startTime: moment('2015-07-11 09:30'), 
                 endTime: moment('2015-07-14 11:30'), 
                 id: 1234 };

  var anEvent = Ember.Object.create( params );
  calendar.showMe('2015-07');
  calendar.addEvent(anEvent);

  var dayNotOne = calendar.findDay('2015-07-30');
  assert.equal(Object.keys(dayNotOne.events).length, 0);

  var dayNotTwo = calendar.findDay('2015-07-15');
  assert.equal(Object.keys(dayNotTwo.events).length, 0);
});
