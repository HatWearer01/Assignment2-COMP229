/*index.js - Tom Harari - 301139588 - 10/31/2022*/

var express = require('express');
const { removeData } = require('jquery');
var router = express.Router();
let mongoose = require("mongoose");
const users = require("../models/user");
const contacts = require("../models/contact");
const contact = require('../models/contact');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tom Harari - Portfolio' });
});

/* GET About Me page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me' });
});

/* GET Projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects' });
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services' });
});

/* GET Contact Me page. */
router.get('/contactme', function(req, res, next) {
  res.render('contactme', { title: 'Contact Me' });
});

/* GET Business Contact List page. */
router.get('/businesscontactlist', function(req, res, next) {
  if (req.session.user) {
    contacts.find().sort({Name: 1}).then(function(items) {
      res.render('businesscontactlist', { 
        title: 'Business Contact List',
          contacts: items
      });
    }) 
  } else {
    res.redirect("/login");
  }
});

// GET - process the delete
router.get("/delete/:id", (req, res, next) => {  
  contact.deleteOne({ _id: req.params.id }, (err, raw) => {
    res.redirect("/businesscontactlist")
  })
});

// For version change
router.post("/update/:id", (req, res, next) => {
  let id = req.params.id
  let updateItem = contact({
    _id: id, 
    Name: req.body.Name,
    Number: req.body.Number,
    Email: req.body.Email,
  })
  contacts.update({_id: id}, updateItem, (err, raw) => {
    if (err)
      console.error(err)
    res.redirect("/businesscontactlist")
  })
});

router.get("/update/:id", (req, res, next) => {
  let id = req.params.id
  contacts.findById(id, (err, docs) => {
    if (!err) {
      res.render("update", {
        title: "Update",
        contact: docs
      })
    }
  })
});

/* GET Login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* POST Login. */
router.post('/login', function(req, res, next) {
  users.findOne(
    {
      Username: req.body.username, 
      Password: req.body.password
    }, 
    function(err, user) {
      if (user != null) {
        req.session.user = user;
        res.redirect("/businesscontactlist")
      } else {
        req.session.user = null
        res.redirect("/login");
      }
    }
  )
});

module.exports = router;
