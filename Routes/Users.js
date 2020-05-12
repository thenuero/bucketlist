const express = require("express");
const router = express.Router();
const User = require("../Model/User");
const { base64encode, base64decode } = require("nodejs-base64");

//Create user
router.post("/", (req, res) => {
  //Find the user.. If exits don't create again
  User.find({ email: req.body.email }, (err, data) => {
    if (err) res.json({ message: err });
    else if (data.length > 0) {
      res.statusCode = 400;
      res.json({ message: "User already exits" });
      res.end();
    } else {
      const user = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        age: req.body.age,
        country: req.body.country,
        password: base64encode(req.body.password),
        joined: new Date(),
      });
      user
        .save()
        .then((data) => {
          res.json(data._id);
        })
        .catch((err) => {
          res.json({ message: err });
        });
    }
  });
});

//Delete a user
router.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err, delres) => {
    if (err) {
      res.json({ message: err });
    }
    if (delres.deletedCount <= 0) {
      res.statusCode = 400;
      res.json({ message: "User doesn't exists. Try again" });
    } else {
      res.statusCode = 200;
      res.json({ message: "User deleted.." });
    }
  });
});

//Return all the user.. This will be used by admin only
router.get("/", (req, res) => {
  User.find((err, users) => {
    if (err) res.json({ message: err });
    else {
      res.json(users);
    }
  });
});

//Get a particular user
router.get("/:id", (req, res) => {
  User.find({ _id: req.params.id }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
});

//Update user fields
router.patch("/:id", (req, res) => {
  //console.log(req.body.country !== undefined);
  User.find({ _id: req.params.id }, (err, user) => {
    if (err) res.send(err);
    else {
      User.updateOne(
        { _id: req.params.id },
        {
          $set: {
            country:
              req.body.country !== undefined
                ? req.body.country
                : user[0].country,
            email:
              req.body.email !== undefined ? req.body.email : user[0].email,
            password:
              req.body.password !== undefined
                ? base64encode(req.body.password)
                : user[0].password,
            age: req.body.age != undefined ? req.body.age : user[0].age,
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
