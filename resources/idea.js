const ResourceRouter = require("../utils/ResourceRouter");
const JSONFileDatabase = require("../utils/JSONFileDatabase");
const path = require("path");

const ideaRouter = new ResourceRouter();
const database = new JSONFileDatabase(path.join(__dirname, "ideasDB.json"));

ideaRouter.onCreate(database.createHandler.bind(database), {
  type: "object",
  properties: {
    authorId: { type: "string", minLength: 3 },
    content: { type: "string", minLength: 3 },
    category: { type: "string", minLength: 3 },
  },
  required: ["authorId", "content", "category"],
});
ideaRouter.onReadAll(database.readAllHandler.bind(database));
ideaRouter.onReadOne(database.readOneHandler.bind(database));
ideaRouter.onUpdate(database.updateHandler.bind(database), {
  type: "object",
  properties: {
    content: { type: "string", minLength: 3 },
    category: { type: "string", minLength: 3 },
  },
  required: [],
  additionalProperties: false,
});
ideaRouter.onDelete(database.deleteHandler.bind(database));

module.exports = { router: ideaRouter.router };
