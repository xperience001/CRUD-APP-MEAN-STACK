const express = require("express");
const app = express();
const cors = require("cors");
const List = require("./database/models/list");
const Task = require("./database/models/task");

const port = process.env.PORT || 3000;

// allow CORS
app.use(cors());

// allow data to be passed through json
app.use(express.json());

// connected database
const mongoose = require("./database/mongoose");

// API endpoints

// base endpoint
app.get("/", (req, res) => {
  res.status(200).send("HELLO, HERE I AM!!!");
});

app.get("/lists", (req, res) => {
  List.find({})
    .then((lists) => res.send(lists))
    .catch((error) => console.log(error));
});

app.post("/lists", (req, res) => {
  const { title } = req.body;
  new List({ title: title })
    .save()
    .then((list) => res.send(list))
    .catch((error) => console.log(error));
});

// app.get('list', (req, res)=>{
//   Task.findOne
// })

// listener
app.listen(port, () => {
  console.log(`server connected on port ${port}`);
});
