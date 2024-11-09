const express = require("express");
const Ajv = require("ajv");

class ResourceRouter {
  constructor() {
    this.router = express.Router();
    this.ajv = new Ajv();
  }

  onCreate(callback, schema = null) {
    /* The callback will be given the new request object
     and must return a response that contains fields "created (boolean)" and "id (string)" */
    this.router.post("/", (req, res) => {
      const reqObj = req.body;
      // schema check
      if (schema !== null) {
        const validate = this.ajv.compile(schema);
        if (!validate(reqObj)) {
          res.status(400).json({ message: "Invalid Schema!" });
          return;
        }
      }
      // Good to go
      try {
        const creationResponse = callback(reqObj);
        res.json(creationResponse);
      } catch (err) {
        console.log(err);

        res.status(500).json({
          message: "Some error occured while creating resource item",
        });
      }
    });
  }

  onReadAll(callback) {
    // All items are returned, as an array from the callback (no pagination support yet)
    this.router.get("/", (req, res) => {
      try {
        const allItems = callback();
        res.json(allItems);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Some error occured while getting all resource items",
        });
      }
    });
  }

  onReadOne(callback) {
    // The callback will be given id as argument and must return the found resource or explicit null if no resource is found
    this.router.get("/:id", (req, res) => {
      const id = req.params.id;
      try {
        const item = callback(id);
        if (item !== null) {
          res.json(item);
        } else {
          res.status(404).json({ message: "Resource not found" });
        }
      } catch (err) {
        console.log(err);

        res.status(500).json({
          message: "Some error occured while getting the resource item",
        });
      }
    });
  }

  onUpdate(callback, schema = null) {
    // The callback will be given id and diff obejct as argument and must return a response with field "updated (boolean)"
    this.router.put("/:id", (req, res) => {
      const id = req.params.id;
      const diffObj = req.body;
      // schema check
      if (schema !== null) {
        const validate = this.ajv.compile(schema);
        if (!validate(diffObj)) {
          res.status(400).json({ message: "Invalid Schema!" });
          return;
        }
      }
      // good to go
      try {
        const updationResponse = callback(id, diffObj);
        res.json(updationResponse);
      } catch (err) {
        console.log(err);

        res.status(500).json({
          message: "Some error occured while updating the resource item",
        });
      }
    });
  }

  onDelete(callback) {
    // The callback will be given id as argument and must return fields "deleted (boolean)" and "deletedId (string)"
    this.router.delete("/:id", (req, res) => {
      const id = req.params.id;
      try {
        const deletionRes = callback(id);
        res.json(deletionRes);
      } catch (err) {
        console.log(err);

        res.status(500).json({
          message: "Some error occured while updating the resource item",
        });
      }
    });
  }
}

module.exports = ResourceRouter;
