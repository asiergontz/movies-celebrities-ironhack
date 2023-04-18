// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
// const bodyParser = require("body-parser");

const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get("/", (req, res) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
  Celebrity.create(req.body)
    .then((celebrity) => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/celebrities/new-celebrity");
    });
});

module.exports = router;
