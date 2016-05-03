var util = require('util'),
    hyperpublic = require('./lib/hyperpublic');

var callback = function (msg) {
  return function (data, code) {
    console.log(msg);
    console.log('------------------------');
    console.log(util.inspect(data));
    console.log('------------------------\n');
  };
}

var client_id = '';
var client_secret = '';

var api = new hyperpublic.API(client_id, client_secret);

api.people.create({
    "email":"jonathan@hyperpublic.com",
    "name":"Jonathan",
    "password": "my_password",
    "tags": "test"
}, callback('/people/{query}'));

api.things.create({
    "display_name": "macbook",
    "tags": "sup",
    "image_url": "http://developers.hyperpublic.com/images/logo.png",
}, callback('/things/{create}'));

api.people.create({
    "display_name": "mcdonalods",
    "tags": "fries",
    "image_url": "http://developers.hyperpublic.com/images/logo.png",
}, callback('/people/{create}'));

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
