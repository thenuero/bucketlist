const express = require("express");
const router = express.Router();
const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const {registerValidation, loginValidation} = require("../validation");
const jwt = require ('jsonwebtoken');

//Create user
router.post("/", registerValidation, (req, res) => {
  User.find({ email: req.body.email }, (err, data) => {
    if (err) res.json({ message: err });
    else if (data.length > 0) {
      res.statusCode = 400;
      res.json({ message: "User already exits" });
      res.end();
      return;
    } else {
      const user = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        age: req.body.age,
        country: req.body.country,
        password: bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10)),
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
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      res.send(err);
    } else if (user.length !== 0) {
       res.json(user._id);
    }
    else {
      res.send("Not such user found");
    }
  });
});

//Update user fields
router.patch("/:id", (req, res) => {
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
                ? bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
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

//Login route
router.post('/login',loginValidation,(req,res) =>{
  User.findOne({email : req.body.email}, (err,user) =>{
    if (err)
    console.log(err);
    else if (user !== null) {
      bcrypt.compare(req.body.password,user.password, (err,resl) =>{
        if (err)
        console.log(err);
        else if (resl) {
          jwt.sign({_id: user._id},"SSSHHH",(err,token) => {
            if (err)
            console.log(err);
            else {
              console.log(token);
              res.json({
                token : token,
                message : "Login Successful"
              });
            }
          })

        }
        else if(!resl) {
          res.send("login failed");
        }
      });
      }
      else {
        res.send("Please register");
    }
  })
})
module.exports = router;
