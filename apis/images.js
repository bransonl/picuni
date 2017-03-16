var validImageId = function(imageId) {
  return imageId == parseInt(imageId);
};


module.exports = function(router, model) {
  router.get("/images/:imageId", function(req, res) {
    var imageId = req.params.imageId;
    if (validimageId(imageId)) {
      model.get(imageId).then(function(image) {
        if (image === null) {
          res.status(404).send("There is no image with id: " + imageId);
        } else {
          res.json(image);
        }
      });
    } else {
      res.status(400).send("Not a valid imageId: " + imageId);
    }
  });

  router.get("/images/new/:limit", function(req, res) {
    var limit = req.params.limit;
    model.getNew(limit).then(function(images) {
      res.json(images);
    });
  });

  router.get("/images/older/:start/:limit", function(req, res) {
    var start = req.params.start;
    var limit = req.params.limit;
    model.getOlder(start, limit).then(function(images) {
      res.json(images);
    });
  });

  router.post("/images", function(req, res) {
    var data = {
      userId: req.body.userId,
      url: req.body.url,
      extension: req.body.extension,
      size: req.body.size,
      caption: req.body.caption
    };
    if (data.userId && data.url && data.extension && data.size && data.caption) {
      model.createImage(data.userId, data.url, data.extension, data.size, data.caption).then(function(image) {
        res.json(image);
      });
    } else {
      var missingFields = [];
      for (var field in data) {
        if (!data.hasOwnProperty(field)) continue;
        if (data[field] == null) missingFields.push(field);
      }
      res.status(400).send("Missing fields: " + missingFields.join(", "));
    }
  });
}