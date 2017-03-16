app.controller("MainController", ["$scope", "$state", "$timeout", "$http", "Upload", "UserService", "ImagesService",
  function($scope, $state, $timeout, $http, Upload, UserService, ImagesService) {
    var loadNew = function() {
      if ($scope.loadingNew) return;
      $scope.loadingNew = true;
      ImagesService.getNew($scope.feedLimit).then(function(images) {
        $scope.loadingNew = false;
        $scope.feed = images;
      });
    }

    // Firefox
    // Load new posts when scroll up at top of page
    $('html').on('DOMMouseScroll', function(e) {
      if ($(window).scrollTop() === 0 && e.originalEvent.detail < 0) {
        loadNew();
      }
    });

    // Chrome, IE, Opera, Safari
    // Load new posts when scroll up at top of page
    $('html').on('mousewheel', function(e) {
      if ($(window).scrollTop() === 0 && e.originalEvent.wheelDelta > 0) {
        loadNew();
      }
    });

    // Load older images at bottom of page if there is still older posts
    $(window).scroll(function() {
      if ($scope.hasOlder && $(window).scrollTop() + $(window).height() === $(document).height()) {
        $scope.loadingOlder = true;
        ImagesService.getOlder($scope.feed[$scope.feed.length - 1].id, $scope.feedLimit).then(function(images) {
          $scope.loadingOlder = false;
          if (images.length > 0) {
            $scope.feed = $scope.feed.concat(images);
          } else {
            $scope.hasOlder = false; // safe to assume no older posts if none loaded - need to handle error
          }
        });
      }
    });

    var toggleDetails = function(image) {
      $scope.detailedImage = image;
      $("#details-modal").modal();
    };

    var toggleSidebar = function() {
      if (!$scope.sidebarOpen) {
        $scope.sidebarOpen = true;
        $("#sidebar").animate({
          left: 0
        }, {
          duration: 200,
          queue: false
        });
      } else {
        $scope.sidebarOpen = false;
        $("#sidebar").animate({
          left: "-150px"
        }, {
          duration: 200,
          queue: false
        });
      }
    }

    var showFeed = function() {
      loadNew();
      $scope.view = "feed";
    }

    var showUpload = function() {
      $scope.view = "upload";
    }

    var logout = function() {
      FB.logout(function(response) {
        $state.go("login");
      });
    };

    var uploadFile = function(file) {
      ImagesService.uploadImage($scope, file, $scope.caption);
    };

    $scope.feedLimit = 10;
    $scope.hasOlder = true;
    $scope.loadingOlder = false;
    $scope.loadingNew = false;
    $scope.feed = [];
    $scope.sidebarOpen = false;
    $scope.view = "feed";
    $scope.caption = "";
    $scope.detailedImage = {};

    $scope.logout = logout;
    $scope.toggleSidebar = toggleSidebar;
    $scope.showFeed = showFeed;
    $scope.showUpload = showUpload;
    $scope.uploadFile = uploadFile;
    $scope.toggleDetails = toggleDetails;

    loadNew();
  }
]);