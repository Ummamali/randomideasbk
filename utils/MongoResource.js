const mongoose = require("mongoose");
const express = require("express");
const Ajv = require("ajv");

class MongoResource {
  constructor(name, schema) {
    this.router = express.Router();
    this.ajv = new Ajv();

    this.ResourceModel = mongoose.model(name, new mongoose.Schema(schema));
  }

  enableCreate(schema = null) {
    this.router.post("/", async (req, res) => {
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
        const resource = new this.ResourceModel(reqObj);
        const creationResponse = await resource.save();
        res.json({ created: true, createdId: creationResponse._id });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Some error occured while creating resource item",
        });
      }
    });
  }

  enableReadAll() {
    this.router.get("/", async (req, res) => {
      try {
        const allItems = await this.ResourceModel.find();
        res.json(allItems);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Some error occured while getting all resource items",
        });
      }
    });
  }

  enableReadOne() {
    this.router.get("/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const item = await this.ResourceModel.findById(id);
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

  enableUpdate(schema = null) {
    this.router.put("/:id", async (req, res) => {
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
        const updationResponse = await this.ResourceModel.findByIdAndUpdate(
          id,
          {
            $set: diffObj,
          }
        );
        if (updationResponse !== null) {
          res.json({ updated: true, updatedId: updationResponse._id });
        } else {
          res.json({ updated: false, updatedId: null });
        }
      } catch (err) {
        console.log(err);

        res.status(500).json({
          message: "Some error occured while updating the resource item",
        });
      }
    });
  }

  enableDelete() {
    // The callback will be given id as argument and must return fields "deleted (boolean)" and "deletedId (string)"
    this.router.delete("/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const deletionRes = await this.ResourceModel.findByIdAndDelete(id);
        if (deletionRes !== null) {
          res.json({ deleted: true, deletedId: deletionRes._id });
        } else {
          res.json({ deleted: false, deletedId: null });
        }
      } catch (err) {
        console.log(err);

        res.status(500).json({
          message: "Some error occured while updating the resource item",
        });
      }
    });
  }
}

module.exports = MongoResource;
