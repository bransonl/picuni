app.controller("LoginController", ["$scope", "$state", "$http", "UserService",
  function($scope, $state, $http, UserService) {
    var handleUserData = function(res) {
      if (!res || !res.data || !res.data.id || !res.data.nickname || !res.data.fbUserId) console.error("Success returned from GET /api/users/fb/" + fbUserId + " but missing data");
      else UserService.setUser(res.data);
    }

    $scope.$on("$viewContentLoaded",
      function() {
        FB.XFBML.parse(document.getElementById("login-container"),
          function() {
            document.getElementById("login-container").style.visibility = "visible";
          });
      });

    FB.Event.subscribe('auth.login', function(res) {
      var fbUserId = res.authResponse.userID;
      if (res.status === "connected" && fbUserId) {
        $http.get("/api/users/fb/" + fbUserId).then(function(res) {
          handleUserData(res);
          $state.go("main");
        }, function(err) {
          if (err.status == 404) {
            var nickname = prompt("This is the first time logging in with this Facebook account. Please select a nickname:");
            $http.post("/api/users", {
              nickname: nickname,
              fbUserId: fbUserId
            }).then(function(res) {
              handleUserData(res);
              $state.go("main");
            });
          }
        });
      }
    });
  }
]);