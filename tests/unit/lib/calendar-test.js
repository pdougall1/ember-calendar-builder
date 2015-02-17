import Calendar from 'ember-calendar-builder/lib/calendar';

var calendar = new Calendar();
var monthKey = "2015-06";

// #showMe
test('shows the correct number of weeks', function (assert) {
  assert.equal(calendar.showMe(monthKey).length, 5);
});

test('all weeks in all months have 7 days', function (assert) {
  var monthNum = 0;
  while (monthNum < 12) {
    var viewableMonth = calendar.showMe('2015-' + monthNum);
    var countWith7Days = 0;
    viewableMonth.forEach(function (week) {
      if (week.length === 7 ) {
        countWith7Days = countWith7Days + 1;
      }
    });
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
