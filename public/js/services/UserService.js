app.factory("UserService", function($rootScope) {
  var currentUser = {
    userId: null,
    nickname: null,
    fbUserId: null
  }

  var getUserId = function() {
    return currentUser.userId;
  };

  var getNickname = function() {
    return currentUser.nickname;
  };

  var getFbUserId = function() {
    return currentUser.fbUserId;
  }

  var setUser = function(user) {
    currentUser.userId = user.id;
    currentUser.nickname = user.nickname;
    currentUser.fbUserId = user.fbUserId;
  };

  var setNickname = function(nickname) {
    currentUser.nickname = nickname;
  };

  return {
    getUserId: getUserId,
    getNickname: getNickname,
    getFbUserId: getFbUserId,
    setUser: setUser,
    setNickname: setNickname
  };
})