const express = require("express");
const router = express.Router();
const List = require("../Model/List");
const { tokenValidation } = require("../validation");

//Returns all the list item
router.get("/", tokenValidation, (req, res) => {
  List.find({ owner: req.user }, (err, lists) => {
    if (err) res.status(err.statusCode).json({ message: err.message });
    else {
      res.json(lists);
    }
  });
});

//Creates a list item
router.post("/", tokenValidation, (req, res) => {
  const list = new List({
    name: req.body.name,
    description: req.body.description,
    todo: req.body.todo,
    tag: req.body.tag,
    owner: req.user,
  });
  list
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

//Deletes a list item
router.delete("/:id", (req, res) => {
  List.deleteOne({ _id: req.params.id }, (err, delres) => {
    if (err) {
      res.json({ message: err });
    }
    if (delres.deletedCount <= 0) {
      res.statusCode = 400;
      res.json({ message: "Item doesn't exists. Try again" });
    } else {
      res.statusCode = 200;
      res.json({ message: "Item deleted.." });
    }
  });
});

//Update list list
router.patch("/:id", (req, res) => {
  List.findOne({ _id: req.params.id }, (err, list) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.message);
    } else {
      try {
        List.updateOne(
          { _id: req.params.id },
          {
            $set: {
              name: req.body.name !== undefined ? req.body.name : list.name,
              description:
                req.body.description !== undefined
                  ? req.body.description
                  : list.description,
              todo: req.body.todo !== undefined ? req.body.todo : list.todo,
              tag: req.body.tag != undefined ? req.body.tag : list.tag,
            },
          },
          (err, resl) => {
            if (err) res.send(err);
            else {
              res.json(resl);
            }
          }
        );
      } catch (e) {
        res.status(500).send(e.message);
      }
    }
  });
});

module.exports = router;
