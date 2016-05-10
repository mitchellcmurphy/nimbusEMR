describe('LoginController', function () {

  beforeEach(function() {
    browser.get('http://localhost:9001/#');
  });

  it('logs in with test user', function () {
    var email = element(by.model('email'));
    var password = element(by.model('pass'));
    var submit = element(by.id('logInButton'));

    expect(browser.getCurrentUrl()).toEqual('http://localhost:9001/#/login');

    //Fill out the form
    email.sendKeys('test.user@testuser.com');
    password.sendKeys('test');
    submit.click();

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
      // test that we are on the right page
      expect(browser.getCurrentUrl()).toEqual('http://localhost:9001/#/packages');
    });
  });
});
