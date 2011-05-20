var sys = require('sys'),
    hyperpublic = require('./lib/hyperpublic');

var callback = function (msg) {
  return function (data, code) {
    console.log(msg);
    console.log('------------------------');
    console.log(sys.inspect(data));
    console.log('------------------------\n');
  };
}

var client_id = '3RiGGtdIlJbVZhlqUvdGg47mwSegIYYHkfsWi0IT';
var client_secret = 'IGqb1qcJfnkZJ839lR70PlI0rnP59SjG6BdOtmqI';

var api = new hyperpublic.API(client_id, client_secret);


// show takes only one id. find. takes an object

console.log(api.people);

api.people.show(4, callback('/people/{id}'));

api.people.find({
        'zipcode': '11211',
        'limit': '2'
        }, callback('/people/{query}'));

api.things.show(722, callback('/things/{id}'));

api.things.find({
        'zipcode': '11211',
        'limit': '2'
        }, callback('/things/{query}'));

api.places.show(100, callback('/places/{id}'))

api.places.find({
        'zipcode': '11211',
        'limit': '2'
        }, callback('/places/{query}'));;
