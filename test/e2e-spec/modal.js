describe('ModalController', function () {

  //NOTE: Before each test we navigate to packages to bring up a modal, we
  //can restrict this back if modals will be shown and need to be tested from
  //other views
  beforeEach(function() {
    browser.get('http://localhost:9001/#');
    var email = element(by.model('email'));
    var password = element(by.model('pass'));
    var submit = element(by.id('logInButton'));

    expect(browser.getCurrentUrl()).toEqual('http://localhost:9001/#/login');

    //Fill out the form
    email.sendKeys('test.user@testuser.com');
    password.sendKeys('test');
    submit.click();

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
      //Navigate to the packages page
      browser.get('http://localhost:9001/#/packages');
      expect(browser.getCurrentUrl()).toEqual('http://localhost:9001/#/packages');

      //Click on a row
      element(by.repeater('package in packages').row(0)).click();

      //Click on the manually assign anchor
      element(by.css('.manually-assign')).click();
    });
  });

  //Checks that the modal is in view
  it("Expects the modal to be in view", function(){
    //Check that the modal is in view
    var modal = element(by.css('.modal-body'))
    expect(modal.isDisplayed()).toBeTruthy();
  });

  //Close the modal by pushing the close modal button
  it("Will close the modal by clicking the close button", function(){
    var closeButton = element(by.id('close-button'));

    //Click button to close the modal
    closeButton.click();

    //Wait for the modal to go away
    browser.waitForAngular();
    browser.executeScript("$('.modal').removeClass('fade');");

    //Check that the modal is NOT in view
    element.all(by.css('.modal-body')).then(function(items) {
      expect(items.length).toBe(0);
    });
  });

});
