var request = require('request');
var requestOptions;
var finish = false;
var taxis = [];
var userlocs = [];
var i = 0;


function getTaxiInfo(){
	while (i<10000 && !finish){
		requestOptions = {
			url: "http://datamall2.mytransport.sg/ltaodataservice/TaxiAvailability?$skip="+i,
			headers:  { 'AccountKey' : 'HerxddpjOWwwCWuan3jxQw==',
				'UniqueUserID' : 'a8770653-13ba-463b-be96-56ad92e7cc69',
				'accept' : 'application/json'},
			method: 'GET',
			json:{}
		};
		request(requestOptions, function(err, response, body){
			if (err){
				console.log(err);
			}else if (response.statusCode === 200){
				for (var i=0;i<body.value.length;i++){
					taxis.push(body.value[i]);
				}
				console.log(taxis.length);
				if (body.value.length === 0){
					finish = true;
				}
			}else{
				console.log(response.statusCode);
			}
		});

		i+=50;
	}
}



function findNearbyUsers(){
	var user1 = {Latitude:1.343828, Longitude:103.687089};
	var user2 = {Latitude:1.342022, Longitude:103.679384};
	var user3 = {Latitude:1.348734, Longitude:103.681817};
	userlocs.push(user1);
	userlocs.push(user2);
	userlocs.push(user3);
}

module.exports = {
	index: function(req, res, next) {
		getTaxiInfo();
		res.render('GeneralUI', { title: 'TaxiME', taxis: taxis, recommend:{valid:false}, number:12345});
	},
	driver: function(req, res, next) {
		findNearbyUsers();
		res.render('DriverUI', { title: 'TaxiME', username:req.user.username, userlocs: userlocs });
	},
	admin: function(req, res, next) {
		res.render('AdminUI', { title: 'TaxiME' });
	},
	login: function(req, res, next) {
		res.render('LoginUI', { title: 'TaxiME'});
	},
}