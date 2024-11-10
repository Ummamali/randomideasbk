const MongoResource = require("../utils/MongoResource");

const ideaResource = new MongoResource("Idea", {
  content: { type: String, required: [true, "Please add some content"] },
  authorId: { type: String },
  category: { type: String },
  date: { type: Date, default: Date.now },
});

ideaResource.enableCreate({
  type: "object",
  properties: {
    authorId: { type: "string", minLength: 3 },
    content: { type: "string", minLength: 3 },
    category: { type: "string", minLength: 3 },
  },
  required: ["authorId", "content", "category"],
});
ideaResource.enableReadAll();
ideaResource.enableReadOne();
ideaResource.enableUpdate({
  type: "object",
  properties: {
    content: { type: "string", minLength: 3 },
    category: { type: "string", minLength: 3 },
  },
  required: [],
  additionalProperties: false,
});
ideaResource.enableDelete();

module.exports = { router: ideaResource.router };
