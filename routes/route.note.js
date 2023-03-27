const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { NoteModel } = require("../models/model.notes");

const noteRoute = express.Router();

noteRoute.get("/", authmiddleware, async (req, res) => {
  const user = req.body.user;
  try {
    const data = await NoteModel.find({ user });
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

noteRoute.post("/add", authmiddleware, async (req, res) => {
  const payload = req.body;
  console.log(payload);
  try {
    const newNote = new NoteModel(payload);
    await newNote.save();
    res.status(200).send({ message: "New note added" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = noteRoute;
