// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/", async (req, res) => {
  try {
    const allMovies = await Movie.find().populate("cast");
    res.render("movies/movies", { allMovies });
  } catch (err) {
    console.log(err);
  }
});

router.get("/create", (req, res) => {
  Celebrity.find()
    .then((celebs) => {
      console.log(celebs);
      res.render("movies/new-movie", { celebs });
    })
    .catch((err) => console.log(err));
});

router.post("/create", async (req, res) => {
  try {
    const newMovie = req.body;
    await Movie.create(newMovie);
    res.redirect("/movies");
  } catch (err) {
    console.log(err);
    res.render("movies/new-movie");
  }
});

// Details of single movie

router.get("/:id", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie });
    })
    .catch((err) => console.log(err));
});

// Delete movie
router.get("/:id/delete", (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.render("movies/movies");
    })
    .catch((err) => console.log(err));
});

router.get("/:id/edit", async (req, res) => {
  const actors = await Celebrity.find();
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
      console.log(movie);
      console.log(actors);
      res.render("movies/edit-movie", { movie, actors });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
