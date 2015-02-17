import Month from 'ember-calendar-builder/lib/month';

var monthKey = "2015-06";
var month = new Month(monthKey);

test('building a month provides days', function( assert ) {
  var keys = ["2015-06-01","2015-06-02","2015-06-03","2015-06-04","2015-06-05","2015-06-06","2015-06-07","2015-06-08","2015-06-09","2015-06-10","2015-06-11","2015-06-12","2015-06-13","2015-06-14","2015-06-15","2015-06-16","2015-06-17","2015-06-18","2015-06-19","2015-06-20","2015-06-21","2015-06-22","2015-06-23","2015-06-24","2015-06-25","2015-06-26","2015-06-27","2015-06-28","2015-06-29", "2015-06-30"];
  month.build();
  assert.deepEqual(Object.keys(month.days), keys);
});

test('can make a viewable version of month', function (assert) {
  month.build();
  assert.equal(month.makeViewable().length, 5);
});

var countWeeksWith7Days = function (weeks) {
  var weeksThatHave7Days = [];
  weeks.forEach(function (week) {
    if (week.length === 7) {
      weeksThatHave7Days.push(week);
    }
  });
  return weeksThatHave7Days;
};

test('each week that is made viewable should have 7 days', function (assert) {
  var weeks = month.build().makeViewable();
  var count = countWeeksWith7Days(weeks);
  assert.equal(count.length, weeks.length);
});

test('renders all months fine to view', function (assert) {
  for (var y = 0; y < 30; y++) {
    var year = "200" + y;
    for (var m = 0; m < 11; m++) {
      month = new Month(moment().year(year).month(m).format('YYYY-MM')).build();
      var weeks = month.build().makeViewable();
      var count = countWeeksWith7Days(weeks);
      assert.equal(count.length, weeks.length);
    }
  }
});

test('can get the first day of the first week of the month', function (assert) {
  var firstDay = month.firstDayOfFirstWeek(monthKey);
  assert.equal(firstDay.format('YYYY-MM-DD'), '2015-05-31');
});

test('can get the last day of the last week of the month', function (assert) {
  var lastDay = month.lastDayOfLastWeek(monthKey);
  assert.equal(lastDay.format('YYYY-MM-DD'), '2015-07-04');
});

test('makes the days inside the month inCurrentMonth', function (assert) {
  var monthKey = "2015-06";
  var month = new Month(monthKey);
  month.build();
  var day = month.days['2015-06-01'];
  assert.equal(day.inCurrentMonth, true);
});
