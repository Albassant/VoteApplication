const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const User = require('../models/user.js');

router.get("/", (req, res) => {
  res.render('index', { user: req.user });
});

router.get('/register', (req, res) => {
  res.render('register', { ref_path: req.query.ref_path, user : req.user, error : req.flash('error')});
});

router.get('/login', (req, res) => {
  res.render('login', { ref_path: req.query.ref_path, user : req.user, error : req.flash('error')});
});

router.post('/register', (req, res, next) => {
  
  var redirect = req.body.ref_path ? req.body.ref_path : '/';

  User.register(new User({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }
    
    passport.authenticate('local')(req, res, () => {
      req.session.save((err) => {
          if (err) {
              return next(err);
          }
          res.redirect(redirect);
          console.log('user registered!');
      });
    });
  });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
  
  var redirect = req.body.ref_path ? req.body.ref_path : '/';
  
  req.session.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect(redirect);
        console.log('user logged in!');
    });
});


router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/settings', (req, res) => {
  res.render('settings');
});


module.exports = router;