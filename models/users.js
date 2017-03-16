module.exports = function(model) {
  var get = function(id) {
      return model.findById(id).then(function(user) {
        return user;
      }).catch(function(error) {
        return -1;
      });
  };

  var getByFbUserId = function(fbUserId) {
    return model.findOne({
      where: {
        fbUserId: fbUserId
      }
    }).then(function(user) {
      return user;
    }).catch(function(error) {
      // handle error
    });
  };

  var createUser = function(nickname, fbUserId) {
    return model.create({
      nickname: nickname,
      fbUserId: fbUserId
    }).then(function(user) {
      return user;
    }).catch(function(error) {
      // handle error
    });
  }

  var setNickname = function(id, nickname) {
    return model.update({
      nickname: nickname
    }, {
      where: {
        id: id
      }
    }).then(function(success) {

    }).catch(function(error) {

    });
  };
  
  return {
    get: get,
    getByFbUserId: getByFbUserId,
    createUser: createUser,
    setNickname: setNickname
  }
}