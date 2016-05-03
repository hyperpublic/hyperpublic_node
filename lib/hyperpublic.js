/*
 * Hyperpublic-node v1
 * 
 * Tip of the hat to by Moto Ishizawa, author of Nodestagram
 * Thanks to Marak from Nodejitsu for protips
 *
 */

var util = require('util'),
    request = require('request'),
    querystring = require('querystring');

var Hyperpublic = {};

Hyperpublic.API = function (client_id, client_secret) {
    
    if (!client_id || !client_secret) {
        throw new Error('You must set your API keys. They can be found at http://hyperpublic.com/oauth_clients');
    }

    this.client_id = client_id;
    this.client_secret = client_secret;
    this.host = 'api.hyperpublic.com';
    this.path = '/api/v1';

    this.people = new Hyperpublic.API.People(this);
    this.places = new Hyperpublic.API.Places(this);
    this.things = new Hyperpublic.API.Things(this);

};

Hyperpublic.API.prototype.get = function(path, params, callback){
    if (arguments.length === 2) {
        callback = params;
        params = {};
    }

    params.client_id = this.client_id;
    params.client_secret = this.client_secret;                       
    var requestUri = 'https://' + this.host + this.path + path + '?' + querystring.stringify(params);


    var options = {
        uri: requestUri
    };
    
    request(options, function (error, response, result) {   
                if (!error) {
                    callback(JSON.parse(result));
                } else {
                    callback(error);
                }
            });
};

Hyperpublic.API.prototype.post = function (path, params, callback) {

    params.client_id = this.client_id;
    params.client_secret = this.client_secret;
    
    var requestData = querystring.stringify(params);

    var requestHeaders = {
        'Content-Length': requestData.length
    };
  
    var options = {                   
        'uri': 'https://' + this.host + this.path + path,
        'headers': requestHeaders,
        'method': 'POST',
        'body': requestData
    };
   
    request(options, function (error, response, result) {            
                if (!error) {
                    callback(JSON.parse(result));
                } else {                    
                    callback(error);
                }
            });
};

/*
 * People Endpoints
 *
 */

Hyperpublic.API.People = function (api) {
    this.api = api;
};

Hyperpublic.API.People.prototype.show = function (id, callback) {
    this.api.get('/people/' + id, callback);
};

Hyperpublic.API.People.prototype.find = function (query, callback) {
    this.api.get('/people/', query, callback);
};

Hyperpublic.API.People.prototype.create = function (query, callback) {
    this.api.post('/people', query, callback);
};

/*
 * Places Endpoints
 *
 */

Hyperpublic.API.Places = function (api) {
    this.api = api;
};

Hyperpublic.API.Places.prototype.show = function (id, callback) {
    this.api.get('/places/' + id, callback);
};

Hyperpublic.API.Places.prototype.find = function (query, callback) {
    this.api.get('/places/', query, callback);
};

Hyperpublic.API.Places.prototype.create = function (query, callback) {
    this.api.post('/places', query, callback);
};

/*
 * Things Endpoints
 *
 */

Hyperpublic.API.Things = function (api) {
    this.api = api;
};

Hyperpublic.API.Things.prototype.show = function (id, callback) {
    this.api.get('/things/' + id, callback);
};

Hyperpublic.API.Things.prototype.find = function (query, callback) {
    this.api.get('/things/', query, callback);
};

Hyperpublic.API.Things.prototype.create = function (query, callback) {
    this.api.post('/things', query, callback);
};

exports.API = Hyperpublic.API;
