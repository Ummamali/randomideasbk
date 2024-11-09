const ResourceRouter = require("../utils/ResourceRouter");
const JSONFileDatabase = require("../utils/JSONFileDatabase");
const path = require("path");

const usersRouter = new ResourceRouter();
const database = new JSONFileDatabase(path.join(__dirname, "usersDB.json"));

usersRouter.onReadAll(database.readAllHandler.bind(database));
usersRouter.onReadOne(database.readOneHandler.bind(database));

module.exports = { router: usersRouter.router };
