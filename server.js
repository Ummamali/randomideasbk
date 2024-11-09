const express = require("express");
const config = require("./config");
const { router: ideaRouter } = require("./resources/idea");
const { router: usersRouter } = require("./resources/users");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    APP: "Random Ideas Backend Services (v1.0.0)",
    message: "Application working as normal!",
    working: true,
  });
});

// Resources Mountpoints
app.use(config.resources.idea.mountpoint, ideaRouter);
app.use(config.resources.users.mountpoint, usersRouter);

app.listen(config.server.port, () =>
  console.log(`Server listening on port ${config.server.port}`)
);
