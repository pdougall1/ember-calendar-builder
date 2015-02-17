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