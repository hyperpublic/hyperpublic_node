var hyperpublic = require('../lib/hyperpublic'),
    vows = require('vows'),
    assert = require('assert'),
    sys = require('sys');


var client_id = 'Y8ccbceyZZbcmNoZ8RsXLHDhxSs0qnL40SmmjRBU',
    client_secret = '5YugC5yJYeFgjcfYf0VrzYnsiVJu00TYJBOTd4r2';

var api = new hyperpublic.API(client_id, client_secret);

api.host = 'localhost:3000';

vows.describe('Test Hyperpublic API Wrapper').addBatch({
    'While you use the Hyperpublic API': {
        'when querying for a person by id' : {
            topic: function () {
                api.people.show(4, this.callback);
            },
            'an an object will be returned': function (topic, err) {
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
            }
        },
        'when searching for people': {
            topic: function () {
                api.people.find({
                    'zipcode' : '11211',
                    'limit' : '2'
                }, this.callback);
            },
            'an array will be returned': function (topic, err) {
                assert.isUndefined(topic.error, err);
                assert.isArray(topic);
            }
        },
        'when creating a person': {
            topic: function () {
                api.people.create({
                    'email':'jonathanvingiano' + Math.floor(Math.random() * 1000) + '@hyperpublic.com',
                    'display_name':'Jonathan V',
                    'password': 'my_password',
                    'tags': 'test'
                }, this.callback);
            },
            'an object will be returned': function (topic, err) {
                assert.isUndefined(topic.error);
                assert.isObject(topic);
            }
        },
        'when querying for a place by id': {
            topic: function () {
                api.places.show(100, this.callback);                
            },
            'an object will be returned': function (topic, err) {
                assert.isUndefined(topic.error);
                assert.isObject(topic);                
            }
        },
        'when searching for places': {
            topic: function () {
                api.places.find({
                    'zipcode': '11211',
                    'limit': '2'
                }, this.callback);
            },
            'an array will be returned': function (topic, err) {
                assert.isUndefined(topic.error);
                assert.isArray(topic);
            }
        },
        'when creating a place': {
            topic: function () {
                api.places.create({
                    'display_name': 'javascript cave'
                }, this.callback);
            },
            'an object will be returned': function (topic, err) {
                assert.isUndefined(topic.error);
                assert.isObject(topic);
            }
        }, 
        'when querying for a thing by id': {
            topic: function () {
                api.things.show(722, this.callback);                
            },
            'an object will be returned': function (topic, err){
                assert.isUndefined(topic.error);
                assert.isObject(topic);                
            }
        },
        'when searching for things': {
            topic: function () {
                api.things.find({
                    'zipcode': '11211',
                    'limit': '2'
                }, this.callback);
            },
            'an array will be returned': function (topic, err) {
                assert.isUndefined(topic.error);
                assert.isArray(topic);                
            }
        },
        'when creating a thing': {
            topic: function (){
                api.things.create({
                    'display_name': 'macbook pro',
                    'tags': 'my expensive paperweight',
                    'image_url': 'http://developers.hyperpublic.com/images/logo.png'
                }, this.callback);                
            },
            'an object will be returned': function (topic, err){
                assert.isUndefined(topic.error);
                assert.isObject(topic);                
            }
        }
    }    
}).run();
