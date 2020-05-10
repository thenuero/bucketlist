const express = require('express');
const router = express.Router();
const User = require('../Model/User');

//Create user
router.post('/create',(req,res) =>{
  //Find the user.. If exits don't create again
  User.find({'email':req.body.email} , (err,data) => {
    if (err)
      res.json({'message':err});
    else if (data.length > 0){
      res.statusCode = 400;
      res.json({'message':'User already exits'});
      res.end();
    }
    else{
      const user = new User({
        name : req.body.name,
        email : req.body.email,
        age : req.body.age,
        country : req.body.country
      });
      user.save()
        .then(data => {
          res.json(data._id);
        })
        .catch(err => {
          res.json({message:err})
        })
    }
  })

})

//Delete a user
router.delete('/:email',(req,res) => {
  User.deleteOne({'email': req.params.email}, (err,delres) => {
    if (err){
      res.json({'message': err})
    }
    if (delres.deletedCount <= 0){
      res.statusCode = 400;
      res.json({message:'specified email is not valid. Try again'});
    }
  })
})

module.exports = router;
