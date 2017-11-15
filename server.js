var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;

// DB Setup
// =============================
var db = require("./modules/db.js");

db.setup();

var usersModel = new require("./models/users.js")(db.users, {Image: db.images});
var imagesModel = new require("./models/images.js")(db.images, {User: db.users});
// =============================


// API Routes
// =============================
var router = express.Router();

var usersApi = new require("./apis/users.js")(router, usersModel);
var imagesApi = new require("./apis/images.js")(router, imagesModel);
// =============================


app.use(express.static(__dirname + "/public"));

app.use("/api", router);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/*", function(req, res) {
  res.redirect("/");
});

app.listen(port);