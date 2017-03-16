var handleResponse = function(res) {
  if (res.status === 200 && res.data && res.data.length > 0) {
    return res.data; 
  } else {
    return [];
  }
}

app.factory("ImagesService", function($rootScope, $timeout, $http, UserService, Upload) {
  var getNew = function(limit) {
    return $http.get("/api/images/new/" + limit).then(function(res) {
      return handleResponse(res);
    }).catch(function(err) {
      console.log(err);
      // handle error
    })
  }

  var getOlder = function(start, limit) {
    return $http.get("/api/images/older/" + start + "/" + limit).then(function(res) {
      return handleResponse(res);
    }).catch(function(err) {
      console.log(err);
    });
  }

  var uploadImage = function($scope, file, caption) {
    var s3Url = "https://picuni.s3.amazonaws.com/"
    var policy = "ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogInBpY3VuaSJ9LAogICAgWyJzdGFydHMtd2l0aCIsICIka2V5IiwgIiJdLAogICAgeyJhY2wiOiAicHVibGljLXJlYWQifSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJENvbnRlbnQtVHlwZSIsICIiXSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJGZpbGVuYW1lIiwgIiJdLAogICAgWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsIDAsIDUyNDI4ODAwMF0KICBdCn0=";
    var signature = "46vcMqZBF/NV7Q69hT7TFHheKbA=";

    var data = {
      key: Date.now() + file.name, // the key to store the file on S3, could be file name or customized
      AWSAccessKeyId: "AKIAIWYAFJ3NNCVW5SKA",
      acl: "public-read", // sets the access to the uploaded file in the bucket: private, public-read, ...
      policy: policy, // base64-encoded json policy (see article below)
      signature: signature, // base64-encoded signature based on policy string (see article below)
      "Content-Type": file.type != '' ? file.type : "application/octet-stream", // content type of the file (NotEmpty)
      filename: file.name, // this is needed for Flash polyfill IE8-9
      file: file
    }

    file.upload = Upload.upload({
      url: s3Url, //S3 upload url including bucket name
      method: 'POST',
      data: data
    });

    return file.upload.then(function(response) {
      $timeout(function() {
        $http.post("/api/images", {
          userId: UserService.getUserId(),
          url: s3Url + data.key,
          extension: file.name.split(".").pop(),
          size: file.size / 1000000,
          caption: caption
        }).then(function() {
          alert("Upload Successful!");
          $scope.result = 1;
          $scope.file = null;
          $scope.caption = "";
          $scope.showFeed();
        }, function(err) {
          alert("Error saving image");
        });
      });
    }, function(response) {
      if (response.status > 0)
        alert("Error saving image");
      $scope.errorMsg = "Error " + response.status + ': ' + response.data;
      return 0;
    }, function(evt) {
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }

  return {
    getNew: getNew,
    getOlder: getOlder,
    uploadImage: uploadImage
  };
})