const MongoResource = require("../utils/MongoResource");

const usersResource = new MongoResource("Users", {
  username: { type: String },
  fullname: { type: String },
});

usersResource.enableReadAll();
usersResource.enableReadOne();

module.exports = { router: usersResource.router };
