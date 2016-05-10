describe('PackagesController', function () {

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
    });
  });

  //Given I am a Dispatcher, when I type a search term in the search box, the Flight Content Packages Table  text highlights the search terms.
  it('Enters text into search bar, checks that there are highlighted items', function(){
    var search = element(by.id('packagesSearch'));
    search.sendKeys("SEA");

    //We expect to find some items with the proper class
    element.all(by.css('.highlighted')).then(function(items) {
      expect(items.length).toBeGreaterThan(0);
    });
  });

  //Proves the opposite of above, searching text not in table should yeild no results
  it('Enters text into search bar, checks that there are NO highlighted items', function(){
    var search = element(by.id('packagesSearch'));
    search.sendKeys("xuaidouwbalshdfybhjlu");

    //We expect to find some items with the proper class
    element.all(by.css('.highlighted')).then(function(items) {
      expect(items.length).toBe(0);
    });
  });

  //Given I am a Dispatcher, when I type a search term in the search box, the Flight Content Packages Table dynamically changes to reflect my search query.
  it('Enters text into search bar, checks that there are the correct number of rows based on mock data', function(){
    var search = element(by.id('packagesSearch'));
    search.sendKeys("SEA");

    //We expect to find 6 rows that match this search
    element.all(by.repeater('package in packages')).then(function(rows) {
      expect(rows.length).toBe(6);

      //Now we delete the search query, all rows should be present
      search.clear();
      element.all(by.repeater('package in packages')).then(function(rows) {
        expect(rows.length).toBe(9);
      });
    });
  });

  var clickAndSort = function(sortId, columnNumberClass){
    //Click on the column and sort
    element(by.id(sortId)).click();

    var row = element.all(by.repeater('package in packages'));
    //Grab the text for the POD Column (currently the 8th)
    var unsorted = row.all(by.css(columnNumberClass)).getText().then(function(texts){
      return texts.slice(0);
    });

    //Click on the column and sort again
    element(by.id(sortId)).click();

    //Grab the contents of the column again
    var sorted = row.all(by.css(columnNumberClass)).getText().then(function(texts){
      return texts.slice(0);
    });

    var equals = protractor.promise.all([unsorted, sorted]).then(function(texts) {
      var unsorted = texts[0];
      var sorted = texts[1];
      //Check they are reverses of each other
      expect(unsorted).toEqual(sorted.reverse());
      //Check that the length matches
      var allEqual = (unsorted.length === sorted.length);
      //Check sorting indexes
      sorted.forEach(function(sortedItem, i) {
        allEqual = allEqual && (sortedItem === unsorted[i]);
      });
      return allEqual;
    });

    expect(equals).toBe(true);
  }

  //The table should sort ascending, descending, and unsorted on subsequent clicks or taps of the header
  it("Should sort the table on Call Sign column click", function() {
    clickAndSort('callSignSort', 'td:nth-of-type(1)');
  });

  it("Should sort the table on Dispatcher column click", function() {
    clickAndSort('dispatcherSort', 'td:nth-of-type(2)');
  });

  it("Should sort the table on Pilot column click", function() {
    clickAndSort('pilotSort', 'td:nth-of-type(3)');
  });

  it("Should sort the table on Flight Plan Id column click", function() {
    clickAndSort('flightPlanIdSort', 'td:nth-of-type(4)');
  });

  it("Should sort the table on Tail Id column click", function() {
    clickAndSort('tailIdSort', 'td:nth-of-type(5)');
  });

  it("Should sort the table on Flight Number column click", function() {
    clickAndSort('flightNumberSort', 'td:nth-of-type(6)');
  });

  it("Should sort the table on POD column click", function() {
    clickAndSort('podSort', 'td:nth-of-type(7)');
  });

  it("Should sort the table on ETD column click", function() {
    clickAndSort('etdSort', 'td:nth-of-type(8)');
  });

  it("Should sort the table on POA column click", function() {
    clickAndSort('poaSort', 'td:nth-of-type(9)');
  });

  it("Should sort the table on State column click", function() {
    clickAndSort('stateSort', 'td:nth-of-type(10)');
  });

  //Given the user is viewing the Flight Content Packages table, when the user taps a Flight Content Packages row, then the row expands to show 2 additional rows
  it("Should expand a package row on click, should contain at least 2 additional rows", function() {
    //Check that hidden data is indeed hidden
    element.all(by.css('.rowExpanded')).then(function(items) {
      expect(items.length).toBe(0);
    });

    //Click on a row
    element(by.repeater('package in packages').row(0)).click();

    //Check that hidden data is now shown
    element.all(by.css('.rowExpanded')).then(function(items) {
      expect(items.length).toBeGreaterThan(2);
    });
  });

  //Given the user is viewing the Flight Content Packages table, when the user taps a Flight Content Packages row, then the row expands to show 2 additional rows, upon a second click rows should be hidden
  it("Should expand a package row on click, should contain at least 2 additional rows", function() {
    //Click on a row to open
    element(by.repeater('package in packages').row(0)).click();

    //Click on a row to close
    element(by.repeater('package in packages').row(0)).click();

    //Check that hidden data is now shown
    element.all(by.css('.rowExpanded')).then(function(items) {
      expect(items.length).toBe(0);
    });
  });

  //Given the user is viewing the Flight Content Packages table, when the user views an expanded package, then the second row shows Type of Aircraft: <aircraft_type>
  it("Should click on a parent row and expect Type of Aircraft: in first expanded row", function() {
    //Click on a row
    element(by.repeater('package in packages').row(0)).click();

    var firstRow = element(by.css('.packageExpandedFirstRow')).getText().then(function(texts){
      return texts;
    });
    expect(firstRow).toContain("Type of Aircraft:");
  });

  //Given the user is viewing the Flight Content Packages table, when the user views an expanded package, then the second row shows  Date of Departure: <departure_date_time>
  it("Should click on a parent row and expect Date of Departure: in first expanded row", function() {
    //Click on a row
    element(by.repeater('package in packages').row(0)).click();

    var firstRow = element(by.css('.packageExpandedFirstRow')).getText().then(function(texts){
      return texts;
    });
    expect(firstRow).toContain("Date of Departure:");
  });

  //Given the user is viewing the Flight Content Packages table, when the user views an expanded package, then the second row shows Alt. Pilot in Command: <alt_pilot_in_command>
  it("Should click on a parent row and expect Alt. Pilot in Command: in first expanded row", function() {
    //Click on a row
    element(by.repeater('package in packages').row(0)).click();

    var firstRow = element(by.css('.packageExpandedFirstRow')).getText().then(function(texts){
      return texts;
    });
    expect(firstRow).toContain("Alt. Pilot in Command:");
  });

  //Given the user is viewing the Flight Content Packages table, when the user views an expanded package, then the second row shows # of Files: <count of the files attached>
  it("Should click on a parent row and expect # of Files in second expanded row", function() {
    //Click on a row
    element(by.repeater('package in packages').row(0)).click();

    //Check the second row has the proper data
    var secondRow = element(by.css('.packageExpandedSecondRow')).getText().then(function(texts){
      return texts;
    });
    expect(secondRow).toContain("# of Files:");
  });

  //Given the user is viewing the Flight Content Packages table, when the user views an expanded package, then the second row shows manually assign
  it("Should click on a parent row and expect manually merge in second expanded row", function() {
    //Click on a row
    element(by.repeater('package in packages').row(0)).click();

    //Check the second row has the proper data
    var secondRow = element(by.css('.packageExpandedSecondRow')).getText().then(function(texts){
      return texts;
    });
    expect(secondRow).toContain("manually assign");
  });

  //Given the user is viewing the Flight Content Packages table, when the user views an expanded package, then the second row shows Merge
  it("Should click on a parent row and expect Merge in second expanded row", function() {
    //Click on a row
    element(by.repeater('package in packages').row(0)).click();

    //Check the second row has the proper data
    var secondRow = element(by.css('.packageExpandedSecondRow')).getText().then(function(texts){
      return texts;
    });
    expect(secondRow).toContain("Merge");
  });

  //Packages Modal Tests
  //Given: I am a dispatcher with a flight plan table expanded
  //When: I select manually assign
  //Then: I am presented with the manually assign a flight plan ID modal
  it("Will open the Manually Assign modal", function(){
    //Click on a row
    element(by.repeater('package in packages').row(0)).click();

    //Click on the manually assign anchor
    element(by.css('.manually-assign')).click();

    //Check that the modal is in view
    var modal = element(by.css('.modal-body'));
    expect(modal.isDisplayed()).toBeTruthy();
  });

});
