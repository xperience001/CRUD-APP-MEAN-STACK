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

// List
// http://localhost:3000/lists/:listId

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

app.get("/lists/:listId", (req, res) => {
  const { listId } = req.params;
  List.findOne({ _id: listId })
    .then((list) => res.send(list))
    .catch((error) => console.log(error));
});

app.patch("/lists/:listId", (req, res) => {
  const { listId } = req.params;
  List.findOneAndUpdate({ _id: listId }, { $set: { title: req.body.title } })
    .then((list) => res.send(list))
    .catch((error) => console.log(error));
});

app.delete("/lists/:listId", (req, res) => {
  const { listId } = req.params;

  // List.findByIdAndDelete({ _id: listId })
  //   .then((list) => res.send(list))
  //   .catch((error) => console.log(error));

  const deleteTasks = (list) => {
    Task.deleteMany({ _listId: list._id })
      .then((list) => res.send(list))
      .catch((error) => console.log(error));
  };

  const list = List.findByIdAndDelete({ _id: listId })
    .then((list) => deleteTasks(list))
    .catch((error) => console.log(error));

  res.send(list);
});

// task
// http://localhost:3000/lists/:listId/tasks/:taskId

app.get("/lists/:listId/tasks", (req, res) => {
  const { listId } = req.params;
  Task.find({ _listId: listId })
    .then((tasks) => res.send(tasks))
    .catch((error) => console.log(error));
});

app.post("/lists/:listId/tasks", (req, res) => {
  const { title } = req.body;
  const { listId } = req.params;
  new Task({ title: title, _listId: listId })
    .save()
    .then((task) => res.send(task))
    .catch((error) => console.log(error));
});

app.get("/lists/:listId/tasks/:taskId", (req, res) => {
  const { listId, taskId } = req.params;
  Task.findOne({ _listId: listId, _id: taskId })
    .then((task) => res.send(task))
    .catch((error) => console.log(error));
});

app.patch("/lists/:listId/tasks/:taskId", (req, res) => {
  const { listId, taskId } = req.params;
  const { title } = req.body;
  Task.findOneAndUpdate(
    { _listId: listId, _id: taskId },
    { $set: { title } } // destructure
  )
    .then((task) => res.send(task))
    .catch((error) => console.log(error));
});

app.delete("/lists/:listId/tasks/:taskId", (req, res) => {
  const { listId, taskId } = req.params;
  Task.findOneAndDelete({ _listId: listId, _id: taskId })
    .then((task) => res.send(task))
    .catch((error) => console.log(error));
});

// listener
app.listen(port, () => {
  console.log(`server connected on port ${port}`);
});
