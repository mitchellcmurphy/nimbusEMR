'use strict';

/**
 * @ngdoc overview
 * @name nimbusEmrApp
 * @description
 * # nimbusEmrApp
 *
 * Main module of the application.
 */
angular
    .module('nimbusEmrApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'firebase',
        'firebase.ref',
        'firebase.auth',
        'apiMock',
        'config',
        'ui.bootstrap'
    ])
    //Constants and config for Mock Data
    .config(["apiMockProvider", function (apiMockProvider) {
        apiMockProvider.config({
            mockDataPath: '/mock-data/package',
            //TODO: Replace the url when this service opens
            apiPath: '/where-ever-packages-comes-from',
        });
    }]);
;

'use strict';

/**
 * @ngdoc function
 * @name nimbusEmrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nimbusEmrApp
 */
angular.module('nimbusEmrApp')
  .controller('MainCtrl', ["$rootScope", "$scope", "Auth", "Ref", function ($rootScope, $scope, Auth, Ref) {
      $scope.logout = function() { Auth.$unauth(); };
  }]);

angular.module('firebase.config', [])
  .constant('FBURL', 'https://nimbusemr.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password'])

  .constant('loginRedirectPath', '/login');

angular.module('firebase.ref', ['firebase', 'firebase.config'])
  .factory('Ref', ['$window', 'FBURL', function($window, FBURL) {
    'use strict';
    return new $window.Firebase(FBURL);
  }]);

'use strict';

angular.module('nimbusEmrApp')
  .filter('reverse', function() {
    return function(items) {
      return angular.isArray(items)? items.slice().reverse() : [];
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name nimbusEmrApp.controller:PackagesController
 * @description
 * # PackagesController
 *
 */
angular.module('nimbusEmrApp')
  .filter('highlight', ["$sce", function($sce) {
    return function(text, phrase) {
      if (phrase)
        text = text.replace(new RegExp('('+phrase+')', 'gi'), '<span class="highlighted">$1</span>');

      return $sce.trustAsHtml(text)
    }
  }]);

(function() {
  'use strict';
  angular.module('firebase.auth', ['firebase', 'firebase.ref'])

    .factory('Auth', ["$firebaseAuth", "Ref", function($firebaseAuth, Ref) {
      return $firebaseAuth(Ref);
    }]);
})();

'use strict';
/**
 * @ngdoc function
 * @name nimbusEmrApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('nimbusEmrApp')
  .controller('LoginCtrl', ["$scope", "Auth", "$location", "$q", "Ref", "$timeout", function ($scope, Auth, $location, $q, Ref, $timeout) {
    $scope.passwordLogin = function(email, pass) {
      $scope.err = null;
      Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true}).then(
        redirect, showError
      );
    };

    $scope.createAccount = function(email, pass, confirm) {
      $scope.err = null;
      if( !pass ) {
        $scope.err = 'Please enter a password';
      }
      else if( pass !== confirm ) {
        $scope.err = 'Passwords do not match';
      }
      else {
        Auth.$createUser({email: email, password: pass})
          .then(function () {
            // authenticate so we have permission to write to Firebase
            return Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true});
          })
          .then(createProfile)
          .then(redirect, showError);
      }

      function createProfile(user) {
        var ref = Ref.child('users', user.uid), def = $q.defer();
        ref.set({email: email, name: firstPartOfEmail(email)}, function(err) {
          $timeout(function() {
            if( err ) {
              def.reject(err);
            }
            else {
              def.resolve(ref);
            }
          });
        });
        return def.promise;
      }
    };

    function firstPartOfEmail(email) {
      return ucfirst(email.substr(0, email.indexOf('@'))||'');
    }

    function ucfirst (str) {
      // inspired by: http://kevin.vanzonneveld.net
      str += '';
      var f = str.charAt(0).toUpperCase();
      return f + str.substr(1);
    }

    function redirect() {
      $location.path('/packages');
    }

    function showError(err) {
      $scope.err = err;
    }


  }]);

'use strict';

/**
 * @ngdoc function
 * @name nimbusEmrApp.controller:ModalController
 * @description
 * # ModalController
 *
 */
angular.module('nimbusEmrApp')
  .controller('ModalController', ["$scope", "$uibModalInstance", "modalData", function ($scope, $uibModalInstance, modalData) {
  //Assign modalData to scope for access in the view
  $scope.modalData = modalData;

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.closeModal = function () {
    $uibModalInstance.dismiss();
  };
}]);

'use strict';

/**
 * @ngdoc function
 * @name nimbusEmrApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the nimbusEmrApp
 */
angular.module('nimbusEmrApp')
    .controller('TestCtrl', ['$rootScope', '$scope', '$interval', 'Auth', 'Ref',
        function ($rootScope, $scope, $interval, Auth, Ref) {
        //set this later by authing the user
        var userid = "user1";
        var hrRef = Ref.child(userid + '/vitals/hr');
        var updaterStarted = false;
        var stop;

        //Initialize the vitals
        $scope.hr = {};

        //Grab the hr when it changes
        hrRef.on("value", function(snapshot) {
            console.log("HR obtained", snapshot.val());
            $scope.hr.value = snapshot.val().value;
            $scope.hr.unitOfMeasure = snapshot.val().unitOfMeasure;
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        $scope.logout = function() { Auth.$unauth(); };

        $scope.startDemo = function(){
            if(updaterStarted === false){
                updaterStarted = true;
                stop = $interval(function() {
                    hrRef.set(
                        {
                            value: Math.floor((Math.random() * 160) + 40),
                            unitOfMeasure: 'bpm'
                        }
                    );
                }, 1000);
            }
        };

        $scope.stopDemo = function(){
            if(updaterStarted === true){
                updaterStarted = false;
                $interval.cancel(stop);
                stop = undefined;
            }
        }
    }]);

'use strict';

/**
 * @ngdoc function
 * @name nimbusEmrApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the nimbusEmrApp
 */
angular.module('nimbusEmrApp')
    .controller('SessionController', ['$rootScope', '$scope', '$interval', 'Auth', 'Ref', 'VitalsSim', '$firebaseArray',
        function ($rootScope, $scope, $interval, Auth, Ref, VitalsSim, $firebaseArray) {

            //Grab the vitals when they change
            $scope.hr = [];
            $scope.sp02 = [];
            $scope.etc02 = [];
            $scope.resp = [];
            var userid = "user1";
            var hrRef = Ref.child(userid + '/vitals/hr');
            var sp02Ref = Ref.child(userid + '/vitals/sp02');
            var etc02Ref = Ref.child(userid + '/vitals/etc02');
            var respRef = Ref.child(userid + '/vitals/resp');
            $firebaseArray(hrRef).$loaded().then(function(hr){
                console.log("HR updated", hr);
                $scope.hr = hr;
            });
            $firebaseArray(sp02Ref).$loaded().then(function(sp02){
                console.log("SP02 updated", sp02);
                $scope.sp02 = sp02;
            });
            $firebaseArray(etc02Ref).$loaded().then(function(etc02){
                console.log("ETC02 updated", etc02);
                $scope.etc02 = etc02;
            });
            $firebaseArray(respRef).$loaded().then(function(resp){
                console.log("Resp updated", resp);
                $scope.resp = resp;
            });

            $scope.startSim = function() {
                //Start the simulator
                VitalsSim.startDemo(Ref);
            };

            $scope.stopSim = function(){
                //Stop the simulator
                VitalsSim.stopDemo();
            }

            $scope.clearData = function(){
                hrRef.remove();
                sp02Ref.remove();
                etc02Ref.remove();
                respRef.remove();
            }
        }
    ]);

'use strict';

/**
 * @ngdoc function
 * @name nimbusEmrApp.factory:VitalsSim
 * @description
 * # Wall
 * VitalsSim Service for the nimbusEmrApp
 */


angular.module('nimbusEmrApp')
    .factory('VitalsSim', ['$rootScope', '$interval', '$firebaseArray',
        function ($rootScope, $interval, $firebaseArray) {
            var stop;
            var vitals = {
                startDemo: function (firebaseRef) {
                    var userid = "user1";
                    //hr
                    var hrRef = firebaseRef.child(userid + '/vitals/hr');
                    var hr = $firebaseArray(hrRef);
                    //sp02
                    var sp02Ref = firebaseRef.child(userid + '/vitals/sp02');
                    var sp02 = $firebaseArray(sp02Ref);
                    //etc02
                    var etc02Ref = firebaseRef.child(userid + '/vitals/etc02');
                    var etc02 = $firebaseArray(etc02Ref);
                    //resp
                    var respRef = firebaseRef.child(userid + '/vitals/resp');
                    var resp = $firebaseArray(respRef);

                    stop = $interval(function () {
                        hr.$add(
                            {
                                value: Math.floor((Math.random() * 190) + 85),
                                unitOfMeasure: 'bpm'
                            }
                        );
                        sp02.$add(
                            {
                                value: Math.floor((Math.random() * 100) + 85),
                                unitOfMeasure: '%'
                            }
                        );
                        etc02.$add(
                            {
                                value: Math.floor((Math.random() * 100) + 85),
                                unitOfMeasure: '%'
                            }
                        );
                        resp.$add(
                            {
                                value: Math.floor((Math.random() * 20) + 1),
                                unitOfMeasure: 'bpm'
                            }
                        );
                    }, 1000);
                },
                stopDemo: function(){
                    $interval.cancel(stop);
                    stop = undefined;
                }
            };

            return vitals;
        }
    ]);
/**
 * @ngdoc function
 * @name nimbusEmrApp.directive:ngShowAuth
 * @description
 * # ngShowAuthDirective
 * A directive that shows elements only when user is logged in. It also waits for Auth
 * to be initialized so there is no initial flashing of incorrect state.
 */
angular.module('nimbusEmrApp')
  .directive('ngShowAuth', ['Auth', '$timeout', function (Auth, $timeout) {
    'use strict';

    return {
      restrict: 'A',
      link: function(scope, el) {
        el.addClass('ng-cloak'); // hide until we process it

        function update() {
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            el.toggleClass('ng-cloak', !Auth.$getAuth());
          }, 0);
        }

        Auth.$onAuth(update);
        update();
      }
    };
  }]);


/**
 * @ngdoc function
 * @name nimbusEmrApp.directive:ngHideAuth
 * @description
 * # ngHideAuthDirective
 * A directive that shows elements only when user is logged out. It also waits for Auth
 * to be initialized so there is no initial flashing of incorrect state.
 */
angular.module('nimbusEmrApp')
  .directive('ngHideAuth', ['Auth', '$timeout', function (Auth, $timeout) {
    'use strict';

    return {
      restrict: 'A',
      link: function(scope, el) {
        el.addClass('ng-cloak'); // hide until we process it
        function update() {
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            el.toggleClass('ng-cloak', !!Auth.$getAuth());
          }, 0);
        }

        Auth.$onAuth(update);
        update();
      }
    };
  }]);

'use strict';
/**
 * @ngdoc overview
 * @name nimbusEmrApp:routes
 * @description
 * # routes.js
 *
 * Configure routes for use with Angular, and apply authentication security
 * Add new routes using `yo angularfire:route` with the optional --auth-required flag.
 *
 * Any controller can be secured so that it will only load if user is logged in by
 * using `whenAuthenticated()` in place of `when()`. This requires the user to
 * be logged in to view this route, and adds the current user into the dependencies
 * which can be injected into the controller. If user is not logged in, the promise is
 * rejected, which is handled below by $routeChangeError
 *
 * Any controller can be forced to wait for authentication to resolve, without necessarily
 * requiring the user to be logged in, by adding a `resolve` block similar to the one below.
 * It would then inject `user` as a dependency. This could also be done in the controller,
 * but abstracting it makes things cleaner (controllers don't need to worry about auth state
 * or timing of displaying its UI components; it can assume it is taken care of when it runs)
 *
 *   resolve: {
 *     user: ['Auth', function(Auth) {
 *       return Auth.$getAuth();
 *     }]
 *   }
 *
 */
angular.module('nimbusEmrApp')

    /**
     * Adds a special `whenAuthenticated` method onto $routeProvider. This special method,
     * when called, invokes Auth.$requireAuth() service (see Auth.js).
     *
     * The promise either resolves to the authenticated user object and makes it available to
     * dependency injection (see AccountCtrl), or rejects the promise if user is not logged in,
     * forcing a redirect to the /login page
     */
    .config(['$routeProvider', 'SECURED_ROUTES', function ($routeProvider, SECURED_ROUTES) {
        // credits for this idea: https://groups.google.com/forum/#!msg/angular/dPr9BpIZID0/MgWVluo_Tg8J
        // unfortunately, a decorator cannot be use here because they are not applied until after
        // the .config calls resolve, so they can't be used during route configuration, so we have
        // to hack it directly onto the $routeProvider object
        $routeProvider.whenAuthenticated = function (path, route) {
            route.resolve = route.resolve || {};
            route.resolve.user = ['Auth', function (Auth) {
                return Auth.$requireAuth();
            }];
            $routeProvider.when(path, route);
            SECURED_ROUTES[path] = true;
            return $routeProvider;
        };
    }])

    // configure views; whenAuthenticated adds a resolve method to ensure users authenticate
    // before trying to access that route
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: 'views/session.html',
                controller: 'SessionController'
            })
            .when('/test', {
                templateUrl: 'views/test.html',
                controller: 'TestCtrl'
            })
            //.whenAuthenticated('/test', {
            //  templateUrl: 'views/test.html',
            //  controller: 'MainCtrl'
            //})
            .otherwise({redirectTo: '/main'});
    }])

    /**
     * Apply some route security. Any route's resolve method can reject the promise with
     * "AUTH_REQUIRED" to force a redirect. This method enforces that and also watches
     * for changes in auth status which might require us to navigate away from a path
     * that we can no longer view.
     */
    //.run(['$rootScope', '$location', 'Auth', 'SECURED_ROUTES', 'loginRedirectPath',
    //  function($rootScope, $location, Auth, SECURED_ROUTES, loginRedirectPath) {
    //    // watch for login status changes and redirect if appropriate
    //    Auth.$onAuth(check);
    //
    //    // some of our routes may reject resolve promises with the special {authRequired: true} error
    //    // this redirects to the login page whenever that is encountered
    //    $rootScope.$on('$routeChangeError', function(e, next, prev, err) {
    //      if( err === 'AUTH_REQUIRED' ) {
    //        $location.path(loginRedirectPath);
    //      }
    //    });
    //
    //    function check(user) {
    //      if( !user && authRequired($location.path()) ) {
    //        $location.path(loginRedirectPath);
    //      }
    //    }
    //
    //    function authRequired(path) {
    //      return SECURED_ROUTES.hasOwnProperty(path);
    //    }
    //  }
    //])

    // used by route security
    .constant('SECURED_ROUTES', {});

"use strict";

 angular.module('config', [])

.constant('MockData', false)

;