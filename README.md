# Ember-calendar-builder
# This is still very much a work in progress!

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).


## Usage

  * To use the events functionality each event must be an Ember object with a beginTime and endTime, each as date attributes.


  * To get started create a controller

```
import Ember from 'ember';
import CalendarMixin from 'ember-calendar-builder/mixins/calendar-mixin';

export default Ember.Controller.extend(CalendarMixin, {
  calendarDate: '2000-01-01',
  someOptions: { hasNewEventButton: true },

  actions: {
    newEvent: function (day) {
      var event = this.store.createRecord('event', {
        beginTime: day.date.toDate(),
        endTime: day.date.toDate(),
        name: "example event"
      });
      this.get('events').pushObject(event);
    }
  }

});
```

  * There is lots of important specifics in this controller!
  * Not crazy about requiring that mixin.

  * The component you make will look a little something like this.

```
{{calendar-builder 
  calendar=calendar
  options=someOptions 
  newEvent="newEvent"
}}
```

  * You must pass in `calendar`.  The calendar object is initialized in the mixin, so it lives in the controller.  Therefor you need to give the component access this way.

  * The date ?



  * The route leading to your controller might look something like this.
```
import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    currentMonth: {
      refreshModel: true
    }
  },

  model: function () {
    return this.store.find('event');
  },

  setupController: function (controller, model) {
    // the name of this paramter is important
    controller.set('calendarEvents', model);
  }
});
```
