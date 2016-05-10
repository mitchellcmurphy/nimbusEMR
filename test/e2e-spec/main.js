describe('MainController', function () {

  var copyright = element(by.id('copyrightFooter'));
  var email = element(by.model('email'));
  var password = element(by.model('pass'));
  var submit = element(by.id('logInButton'));

  beforeEach(function() {
    browser.get('http://localhost:9001/#');
  });

  //Header tests
  //Given I am a user, when I view the page, then the header should have the app name centered
  it('Checks that the app name is properly centered', function(){
    element(by.id('title')).getCssValue('text-align').then(function (textAlignValue) {
      expect(textAlignValue).toBe('center');
    });
  });

  //Given I am a user, when I am logged in, then my name is visible in the header
  it('Should log in and check that the user name is shown', function(){
    expect(browser.getCurrentUrl()).toEqual('http://localhost:9001/#/login');

    //Fill out the form
    email.sendKeys('test.user@testuser.com');
    password.sendKeys('test');
    submit.click();

    //Check that the user name is shown after we wait for the site to change
    //We expect to be on the account page, but we need to wait for the page to route
    var currentUrl;
    browser.getCurrentUrl().then(function(url) {
        currentUrl = url;
      }
    ).then(function() {
        browser.wait(function() {
          return browser.getCurrentUrl().then(function (url) {
            return url !== currentUrl;
          });
        });
      }
    ).then(function () {
      // Test that we see the right thing
      var username = element(by.id('user-container'));
      expect(username.isDisplayed()).toBeTruthy();
    });
  });

  //Given I am a user, when I am logged in, then the log out button is visible in the header
  it('Should log in and check that the log out is shown', function(){
    expect(browser.getCurrentUrl()).toEqual('http://localhost:9001/#/login');

    //Fill out the form
    email.sendKeys('test.user@testuser.com');
    password.sendKeys('test');
    submit.click();

    //Check that the user name is shown after we wait for the site to change
    //We expect to be on the account page, but we need to wait for the page to route
    var currentUrl;
    browser.getCurrentUrl().then(function(url) {
        currentUrl = url;
      }
    ).then(function() {
        browser.wait(function() {
          return browser.getCurrentUrl().then(function (url) {
            return url !== currentUrl;
          });
        });
      }
    ).then(function () {
      // Test that we see the right thing
      var logout = element(by.id('logout-container'));
      expect(logout.isDisplayed()).toBeTruthy();
    });
  });

  //Given I am a user, when I click the Jeppesen logo, then I am directed to www.jeppesen.com
  it('Should log in and check that the Jeppesen logo has the proper href', function(){
    expect(browser.getCurrentUrl()).toEqual('http://localhost:9001/#/login');

    //Fill out the form
    email.sendKeys('test.user@testuser.com');
    password.sendKeys('test');
    submit.click();

    //Check that the user name is shown after we wait for the site to change
    //We expect to be on the account page, but we need to wait for the page to route
    var currentUrl;
    browser.getCurrentUrl().then(function(url) {
        currentUrl = url;
      }
    ).then(function() {
        browser.wait(function() {
          return browser.getCurrentUrl().then(function (url) {
            return url !== currentUrl;
          });
        });
      }
    ).then(function () {
      // Test that we see the right thing
      var jeppson = element(by.id('logo-container'));
      expect(jeppson.getAttribute('href')).toEqual('http://www.jeppesen.com/');
    });
  });

  //Given I am a user and logged in, when I click the log out button, then I am logged out of the application
  it('Should log in, then log out', function(){
    expect(browser.getCurrentUrl()).toEqual('http://localhost:9001/#/login');

    //Fill out the form
    email.sendKeys('test.user@testuser.com');
    password.sendKeys('test');
    submit.click();

    //Check that the user name is shown after we wait for the site to change
    //We expect to be on the account page, but we need to wait for the page to route
    var currentUrl;
    browser.getCurrentUrl().then(function(url) {
        currentUrl = url;
      }
    ).then(function() {
        browser.wait(function() {
          return browser.getCurrentUrl().then(function (url) {
            return url !== currentUrl;
          });
        });
      }
    ).then(function () {
      //Test Log out
      var logout = element(by.id('logout-container'));
      logout.click();
      expect(browser.getCurrentUrl()).toEqual('http://localhost:9001/#/login');
    });
  });

  //Footer E2E Tests
  it('Anchor href for Terms of Use on footer is correct', function(){
    expect(element(by.id('termsOfUseAnchor')).getAttribute('href')).toEqual('http://ww1.jeppesen.com/legal/terms-of-use.jsp');
  });

  it('Anchor href for Privacy Policy on footer is correct', function(){
    expect(element(by.id('privacyPolicyAnchor')).getAttribute('href')).toEqual('http://ww1.jeppesen.com/legal/privacy-policy.jsp');
  });

  it('Anchor href for Software Policy on footer is correct', function(){
    expect(element(by.id('softwarePolicyAnchor')).getAttribute('href')).toEqual('http://localhost:9001/#/');
  });

  it('Should check that the copyright is shown', function(){
    expect(copyright.isDisplayed()).toBeTruthy();
  });

  it('Should check that the copyright has the correct content', function(){
    expect(copyright.getText()).toEqual('Copyright © 2015 - 2016 Jeppesen. All Rights Reserved.');
  });

});
