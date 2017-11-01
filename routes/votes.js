const express = require('express');
const router = express.Router();
const path = require('path');
const Vote = require('../models/vote.js');

router.get("/:username/:votename", (req, res) => {
  
  var data = {
    ref_path: req.url,
    user: req.user,
    username: req.params.username,
    votename: req.params.votename,
    voteoptions: []
  }
  
  //get vote options from DB
  Vote.find({username: data.username, name: data.votename}, function(err, doc) {
    if (doc) {
      res.send(JSON.stringify(doc));
    } else {
      res.end(JSON.stringify({"error": "There's no data for specified username and votename"}));
    }
  });
  
  //res.render('vote', data);
});

router.get("/votes", (req, res) => {
  Vote.find({username: req.user.username}, function (err, doc){
    if (doc) {
      res.send(JSON.stringify(doc));
    } else {
      res.end(JSON.stringify({"error":"There's no votes for this user"}));
    }
  });
});

router.post('/add', (req, res) => {
  
  console.log(req.url);
  console.log(req.query.options);
  
  var newVote = Vote({
      name: req.query.votename,
      username: req.user.username,
      questions: req.query.options.map((item) => { return { question: item, rating: 0}}) //FIXME!!!! it should be an array of options
    });
  
  newVote.save(function(err) { // FIXME!! move response handling to client and remove add.pug
    if (err) console.log(err);
    //res.render('add', { message : 'Your poll was successfully saved', error : req.flash('error')});
    // FIXME!!! handle error for client side
    else
    {
      var url = "https://trite-engineer.glitch.me/" + newVote.username + "/" + encodeURI(newVote.name);
      res.send(url);
    }
  });
});

router.get('/test', (res, req) => {
  
});

module.exports = router;