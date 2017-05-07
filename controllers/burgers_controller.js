var express = require("express");
var db = require("../models");
var router = express.Router();
var burger = require("../models/burger");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  // express callback response by calling burger.selectAllBurger
  db.burger.findAll({}).then(function(data) {
    var obj = {
      burgers: data
    };
      
    res.render("index", obj);
    });
  });
// post route -> back to index
router.post("/burgers/create", function(req, res) {
  // takes the request object using it as input for buger.addBurger
  db.burger.create(req.body).then(function(data) {
      res.json(data);
  });res.redirect("/");
});

// put route -> back to index
router.put("/burgers/update", function(req, res) {
   db.burger.update(
      req.body.devoured,
      {
        where: {
          id: req.body.id
        }
      }).then(function(data) {
        res.json(data);
      }); res.redirect("/");
});

module.exports = router;

