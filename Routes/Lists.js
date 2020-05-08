const express = require('express');
const router = express.Router();
const List = require('../Model/List');


//Returns all the list item
router.get('/',(req,res) =>{
  List.find((err,lists) =>{
    if (err)
      res.json({message:err})
      else{
        res.json(lists);
      }
  })

});


//Get a particular list item
router.get('/:tag',(req, res) => {
  List.find({'tag': req.params.tag},(err,lists) =>{
    if (err)
      res.json({msg:err})
      else{
        res.json(lists)
      }
  });
});


//Creates a list item
router.post('/',(req,res) =>{
  const list = new List({
    name : req.body.name,
    description : req.body.description,
    todo : req.body.todo,
    tag : req.body.tag
  });
  list.save()
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json({message : err})
    })
});


//Deletes a list item
router.delete('/:name',(req,res) =>{
  List.remove({'name': req.params.name},(err) => {
    if (err)
    res.json({msg:err})
    else{
      List.find((err,list) =>{
          if (err)
          res.json({msg:err})
          else {
            res.json(list)
          }
      })
    }
  })
});

//Update list list
router.patch('/:tag', (req,res) => {
  List.updateMany({'tag' : req.params.tag},{$set:{'tag':req.body.tag}},(err,resl) =>{
    if (err)
    res.json({msg:err});
    else{
      res.json(resl)
    }
  })
})

module.exports = router;
