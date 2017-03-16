var validUserId = function(userId) {
  return userId == parseInt(userId);
};

module.exports = function(router, model) {
  router.get("/users/:userId", function(req, res) {
    var userId = req.params.userId;
    if (validUserId(userId)) {
      model.get(userId).then(function(user) {
        if (user === null) {
          res.status(404).send("There is no user with id: " + userId);
        } else {
          res.json(user);
        }
      });
    } else {
      res.status(400).send("Not a valid userId: " + userId);
    }
  });

  router.get("/users/fb/:fbUserId", function(req, res) {
    var fbUserId = req.params.fbUserId;
    if (fbUserId) {
      model.getByFbUserId(fbUserId).then(function(user) {
        if (user === null) {
          res.status(404).send("There is no user with Facebook user id: " + fbUserId);
        } else {
          res.json(user);
        }
      });
    }
  });

  router.post("/users", function(req, res) {
    var nickname = req.body.nickname;
    var fbUserId = req.body.fbUserId;
    if (nickname && fbUserId) {
      model.createUser(nickname, fbUserId).then(function(user) {
        res.json(user);
      });
    } else {
      var missingFields = [];
      if (nickname == null) missingFields.push("nickname");
      if (fbUserId == null) missingFields.push("fbUserId");
      res.status(400).send("Missing fields: " + missingFields.join(", "));
    }
  });
}