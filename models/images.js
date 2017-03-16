module.exports = function(model, others) {
  var get = function(id) {
    return model.findById(id, {
      include: [others["User"]]
    }).then(function(image) {
      return image;
    }).catch(function(error) {
      // handle error
    });
  };

  var getNew = function(limit) {
    return model.findAll({
      limit: limit,
      order: [["id", "DESC"]],
      include: [others["User"]]
    }).then(function(images) {
      return images;
    }).catch(function(error) {
      // handle error
    });
  }

  var getOlder = function(start, limit) {
    return model.findAll({
      where: {
        id: {
          lt: start
        }
      },
      limit: limit,
      order: [["id", "DESC"]],
      include: [others["User"]]
    }).then(function(images) {
      return images;
    }).catch(function(error) {
      // handle error
    })
  }

  var createImage = function(userId, url, extension, size, caption) {
    console.log(userId, url, extension, size, caption);
    return model.create({
      "user_id": userId,
      url: url,
      extension: extension,
      size: size,
      caption: caption
    }).then(function(image) {
      return image;
    }).catch(function(error) {
      // handle error
    });
  };

  return {
    get: get,
    getNew: getNew,
    getOlder: getOlder,
    createImage: createImage
  }
}