const express = require("express");
const cors = require("cors");
const config = require("./config");
const { router: ideaRouter } = require("./resources/idea");
const { router: usersRouter } = require("./resources/users");
require("dotenv").config();
const { connectDB } = require("./utils/db");

// Connecting to mongo database
connectDB();

const app = express();

// middlewares
app.use(cors());
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
