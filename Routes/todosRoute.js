const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
express.urlencoded({ extended: true });
const router = express.Router();
const TodoModel = require("../models/Todo");

const db =
  "mongodb+srv://dima:4WneUdGhd16Cl37v@todoscluster.d20zw.mongodb.net/todos?retryWrites=true&w=majority";
mongoose.connect(process.env.db || db, () => {
  console.log("connected to db");
});
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Create todo
router.post("/todos", (req, res) => {
  const { title, description, isCompleted } = req.body;
  if (title == "" || description == "" || !title || !description) {
    res.status(400).send({
      error: "Empty data",
    });
  } else {
    let todo = new TodoModel({
      title,
      description,
      isCompleted
    });

    todo
      .save()
      .then((data) => {
        console.log(data);
        res.send({ message: "saved" });
      })
      .catch((err) => res.send({ error: err }));
  }
});

//Read all todos
router.get("/todos", async (req, res) => {
  let al = await TodoModel.find().sort({date:-1, isCompleted:-1});
  res.send(al);
});

//Read a todo
router.get("/todos/:id", async (req, res) => {
  var id = req.params.id;
  try {
    var al = await TodoModel.findOne({ _id: id });
  } catch (err) {
    res.send({ error: err });
  }

  res.send(al);
});

//Update a todo
router.post("/todos/update/:id", (req, res) => {
  const id = req.params.id;
  const { title, description, isCompleted } = req.body;
  if (title == "" || description == "" || !title || !description) {
    res.status(400).send({
      error: "Invalid data",
    });
  } else {
    TodoModel.updateOne({ _id: id }, { title, description, isCompleted })
      .then((data) => {
        console.log(data);
        res.send({ message: "Updated" });
      })
      .catch((err) => res.send({ error: err }));
  }
});

//Delete a todo
router.post("/todos/delete/:id", (req, res) => {
  const id = req.params.id;

  try {
    TodoModel.deleteOne({ _id: id }, (data) => {
      res.send(data);
    });
  } catch (e) {
    res.send({ error: err });
  }
});

module.exports = router;
