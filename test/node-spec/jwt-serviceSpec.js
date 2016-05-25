describe('JWT-Service', function() {

  var jwtService = require('../../server/jwt-service//jwt-service');
  var request = require('request');
  var jwt = require('jsonwebtoken');
  var secret = "superSecretKey12345";

  it("should respond with a token when called", function (done) {
    var url = "http://localhost:8080/obtainJWT";
    var params = {username:'testUser', password:'password1'};
    request({url:url, qs:params}, function (error, response, body) {
      expect(body).toContain('token');
      done();
    });
  });

  it("should respond with a PROPER HMAC SHA256 token and checks username", function (done) {
    var url = "http://localhost:8080/obtainJWT";
    var params = {username:'testUser', password:'password1'};
    request({url:url, qs:params}, function (error, response, body) {
      try {
        //Parse the response
        var object = JSON.parse(body);
        //Decode the token
        var decoded = jwt.verify(object.token, secret);
        //Check the password
        expect(decoded.username).toEqual(params.username);
        done();
      }
      catch(err){
        console.log(err);
        //Purposefully fail the test
        expect(true).toBe(false);
        done();
      }
    });
  });

  it("should respond with a PROPER HMAC SHA256 token and checks password", function (done) {
    var url = "http://localhost:8080/obtainJWT";
    var params = {username:'testUser', password:'password1'};
    request({url:url, qs:params}, function (error, response, body) {
      try {
        //Parse the response
        var object = JSON.parse(body);
        //Decode the token
        var decoded = jwt.verify(object.token, secret);
        //Check the password
        expect(decoded.password).toEqual(params.password);
        //jwtService.close();
        done();
      }
      catch(err){
        console.log(err);
        //Purposefully fail the test
        expect(true).toBe(false);
        //jwtService.close();
        done();
      }
    });
  });

  it("should shut down the service and be the last test to run", function (done){
    jwtService.close();
    //Now we are going to make a call and expect an error, or undefined body
    var url = "http://localhost:8080/obtainJWT";
    var params = {username:'testUser', password:'password1'};
    request({url:url, qs:params}, function (error, response, body) {
      try {
        //On the return call we should have undefined body,
        //Which means our server was shut down properly
        expect(body).toBeUndefined();
        done();
      }
      catch(err){
        //We pass if we have an error as well
        expect(err).not.toBeUndefined();
        done();
      }
    });
  });
});
