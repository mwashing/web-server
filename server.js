var express = require('express');
var app = express();
var port = 3000;

// adding in middleware to support route level activity
var middleware = {
	requireAuthentication: function(req,res,next){
		console.log('private route hit');
		next();
	},
	logger: function(req,res,next){
		console.log('Request: '+req.method + ' '+ req.originalUrl + ' ' + new Date().toString());
		next();
	}
};

// add global middleware

app.use(middleware.logger);
app.get('/about',middleware.requireAuthentication, function(req,res){
	res.send("About Us!")
});

app.use(express.static(__dirname +"/public"));

app.listen(port, function (){
	console.log('Express server started on port ' + port);
});