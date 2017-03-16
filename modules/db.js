var Sequelize = require('sequelize');
var sequelize = new Sequelize('picuni', 'branson', 'unicorns31', {
  host: 'picuni.cgjplocrmolf.us-east-1.rds.amazonaws.com',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var setup = function() {
  var User = sequelize.define("user", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nickname: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      fbUserId: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        field: "fb_userid"
      }
    }, {
      underscored: true
    });

    var Image = sequelize.define("image", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      url: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
      },
      extension: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      size: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      caption: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });

    /*var Feed = sequelize.define("feed", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    })*/

    User.hasMany(Image, {foreignKey: "user_id"});
    Image.belongsTo(User, {foreignKey: "user_id"});
    //Feed.belongsTo(User, {foreignKey: "user_id"});
    //Feed.belongsTo(Image, {foreignKey: "image_id"});

    User.sync().then(function() {
      Image.sync();
    });

    exports.users = User;
    exports.images = Image;
    //exports.feeds = Feed;
};

exports.user = {};
exports.image = {};
exports.feed = {};
exports.setup = setup;