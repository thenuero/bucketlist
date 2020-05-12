const express = require("express");
const router = express.Router();
const List = require("../Model/List");

//Returns all the list item
router.get("/", (req, res) => {
  List.find((err, lists) => {
    if (err) res.json({ message: err });
    else {
      res.json(lists);
    }
  });
});

//Get a particular list item
router.get("/:id", (req, res) => {
  List.find({ _id: req.params.id }, (err, lists) => {
    if (err) res.json({ msg: err });
    else {
      res.json(lists);
    }
  });
});

//Creates a list item
router.post("/", (req, res) => {
  const list = new List({
    name: req.body.name,
    description: req.body.description,
    todo: req.body.todo,
    tag: req.body.tag,
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
  //console.log(req.body.country !== undefined);
  List.find({ _id: req.params.id }, (err, list) => {
    if (err) res.send(err);
    else {
      List.updateOne(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name !== undefined ? req.body.name : list[0].name,
            description:
              req.body.description !== undefined
                ? req.body.description
                : list[0].description,
            todo: req.body.todo !== undefined ? req.body.todo : list[0].todo,
            tag: req.body.tag != undefined ? req.body.tag : list[0].tag,
          },
        },
        (err, resl) => {
          if (err) res.send(err);
          else {
            res.json(resl);
          }
        }
      );
    }
  });
});

module.exports = router;
