/*
 * Hyperpublic-node v1
 * 
 * Modeled after node-instagraphy by Moto Ishizawa
 *
 */

var sys = require('sys'),
    http = require('http'),
    https = require('https'),
    querystring = require('querystring');

var Hyperpublic = {};

Hyperpublic.API = function (client_id, client_secret) {

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

    var options = {
        host: this.host,
        path: this.path + path + '?' + querystring.stringify(params)    
    };

    https.get(options, function (res) {
        var content = '';
        res.on('data', function (chunk){
            content += chunk;
        });
        
        res.on('end', function () {
            var result = JSON.parse(content);
            // we really should be accessing the status code here
            callback(result);

        });
    });
};


Hyperpublic.API.prototype.post = function (path, params, callback) {

    params.client_id = this.client_id;
    params.client_secret = this.client_secret;

    var requestData = querystring.stringify(params);
    console.log(requestData);
    var requestHeaders = {
        'Content-Length': requestData.length,
    };

    var options = {
        host: this.host,
        path: this.path + path  + '?', 
        headers: requestHeaders,
        method: 'POST'
    };

    var req = https.request(options, function (res) {
        console.log("statusCode: ", res.statusCode);
        console.log("headers: ", res.headers);
        res.on('data', function (chunk) {
            console.log('body: ' + chunk);
        });
    });

    req.write(requestData);
    req.end();

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
    this.api.get('/things/' + id, callback);
};

Hyperpublic.API.Places.prototype.find = function (query, callback) {
    this.api.get('/things/', query, callback);
};

Hyperpublic.API.Places.prototype.create = function (query, callback) {
    this.api.post('/things', query, callback);
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
