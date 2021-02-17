/*
 Authors: Markus Lu and Mo Mohseni
 Your name and student #: Mo Mohseni A00964043
 Your Partner's Name and student #: Markus Lu A01224733
*/
const { render } = require("ejs");
const express = require("express");
const fs = require("fs")

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index", {movie : []}));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
    let formData = req.body;
    console.log(formData);
    let movies = formData.movieList;
    console.log(movies)
    res.render("pages/index", {movie: movies.split(",")});
});

app.get("/myListQueryString", (req, res) => {
  let movie1 = req.query.movie1;
  let movie2 = req.query.movie2;
  movieList = []
  movieList = movieList.concat(movie1, movie2)
  res.render("pages/index", {movie: movieList})
});

app.get("/search/:movieName", (req, res) => {
  let movieName = req.params.movieName;

  fs.readFile('movieDescriptions.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return
    }
    for (line of data.split("/n")){
      console.log(line)
      if (line.includes(movieName)){
        movieInfo = line.split(":")
        let movie = {
          name: movieInfo[0],
          description : movieInfo[1]
        }
        return res.render('pages/searchResult', {movie: movie})
      }
      else{
        return res.render('pages/searchResult', {movie : null})
      }
    }
  }) 
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});