var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');

var port = process.env.PORT || 8080;

var secretKey = 'superSecretKey12345';

app.get('/obtainJWT',function(req, res){
  var token = jwt.sign(req.query, secretKey);
  console.log("Token made: ", token);
  res.send({ token: token });
});

var server = app.listen(port, function () {
  var port = server.address().port;
  console.log('JWT Service app listening at port %s', port);
});
module.exports = server;


