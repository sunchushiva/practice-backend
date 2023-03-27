const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/model.user");
const jwt = require("jsonwebtoken");

const userRoute = express.Router();

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await UserModel.find({ email });
    const user = data[0]._id;
    bcrypt.compare(password, data[0].password, function (err, result) {
      if (result) {
        res.status(200).send({
          message: "Login successfully",
          token: jwt.sign(
            {
              user,
            },
            "wrong-secret",
            { expiresIn: "1h" }
          ),
          name: data[0].name,
        });
      } else {
        res.status(400).send({ message: err });
      }
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

userRoute.post("/auth", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 2, async function (err, hash) {
      if (hash) {
        const newUser = new UserModel({ name, email, password: hash });
        await newUser.save();
        res.status(200).send({ message: "Sign-in successful" });
      } else {
        res.status(400).send({ message: err });
      }
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = userRoute;
