var bcrypt = require('bcrypt-nodejs');
var apiKey = require('./api_config.js');
var googleMapsClient = require('@google/maps').createClient({
  key: apiKey.geoCode['key']
});

exports.isLoggedIn = function(req, res) {
	return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req, res) {
	if (!exports.isLoggedIn(req)) {
	    res.writeHead(401);
	    res.end();
	 } else {
	  	res.writeHead(200);
	    res.end();
	}
};

exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
      req.session.user = newUser;
      var userInfo = {};
	  userInfo['name'] = res.session.user.name;
	  userInfo['username'] = res.session.user.username;
	  userInfo['location'] = res.session.user.location;
	  userInfo['geoLocation'] = {};
	  userInfo['geoLocation']['lat'] = res.session.user.latitude;
	  userInfo['geoLocation']['long'] = res.session.user.longitude;
      res.send(userInfo);
    });
};

exports.comparePassword = function(candidatePassword, savedPassword, cb) {
	bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
		if (err) {
			return cb(err);
		} else {
			cb(null, isMatch);
		}
	});
};

exports.geoCodeit = function(res, streetAddress, cb) {
  	googleMapsClient.geocode({
  		address: streetAddress
	}, function(err, response) {
		if(err) {
			return cb(err);
		} else {
			cb(null, response);
		}
	});
};