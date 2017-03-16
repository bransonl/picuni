var app = angular.module("picuni", ["ui.router", "ngFileUpload"]);

app.config(function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  var loginState = {
    name: "login",
    url: "/login",
    templateUrl: "views/login.html",
    controller: "LoginController",
  };

  var mainState = {
    name: "main",
    url: "/",
    templateUrl: "views/main.html",
    controller: "MainController",
    resolve: {
      checkLogin: function() {
        FB.getLoginStatus(function(res) {
          if (res.status !== "connected") {
            $state.go("login");
          }
        });
      }
    }
  };

  $stateProvider.state(loginState);
  $stateProvider.state(mainState);
});

app.run(function ($rootScope, $state, $http, UserService) {
  window.fbAsyncInit = function () {
    FB.getLoginStatus(function(res) {
      if (res.status === "connected") {
        $http.get("/api/users/fb/" + res.authResponse.userID).then(function(res) {
          UserService.setUser(res.data);
        });
        $state.go("main");
      } else {
        $state.go("login");
      }
    });
  };
});