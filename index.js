const express = require("express");
const { connection } = require("mongoose");
const noteRoute = require("./routes/route.note");
const userRoute = require("./routes/route.user");
const app = express();
app.use(express.json());

app.use("/", userRoute);
app.use("/notes", noteRoute);

app.listen(8080, async () => {
  try {
    console.log("Server started");
    await connection;
    console.log("Connected to Mongo");
  } catch (err) {
    console.log("Couldn't connect to Mongo");
  }
});
