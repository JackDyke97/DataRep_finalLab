const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');


//so we use cors every time
app.use(cors());
//allows us to access teh sql functions
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//configuration lines for where we find out build folder and static files
app.use(express.static(path.join(__dirname,'../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())
//connecting to our mongoose database
const myConnectionString =
  "mongodb+srv://admin:admin@cluster0.lngwg.mongodb.net/movies?retryWrites=true&w=majority";
mongoose.connect(myConnectionString, { useNewUrlParser: true });
//creating our schema
const Schema = mongoose.Schema;;
//defining our schema 
var movieSchema = new Schema({
  title: String,
  year: String,
  poster: String,
})
//creating a new model for out database
var MovieModel = mongoose.model("movie", movieSchema)

//calling our api/movies page
 app.get("/api/movies", (req, res) => {
//   const mymovies = [
//     {
//       Title: "Avengers: Infinity War",
//       Year: "2018",
//       imdbID: "tt4154756",
//       Type: "movie",
//       Poster:
//         "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
//     },
//     {
//       Title: "Captain America: Civil War",
//       Year: "2016",
//       imdbID: "tt3498820",
//       Type: "movie",
//       Poster:
//         "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg",
//     },
//     {
//       Title: "World War Z",
//       Year: "2013",
//       imdbID: "tt0816711",
//       Type: "movie",
//       Poster:
//         "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
//     },
//   ];

MovieModel.find((err, data)=>{
  res.json(data);
});;

//   res.status(200).json({
//     message: "Everything is good",
//     movies: mymovies,
//   });
});

//method thats reads data from the database and display, edit and delete different parts of our app
app.get("/api/movies/:id", (req, res) => {
    console.log(req.params.id);

     MovieModel.findById(req.params.id, (err, data) =>{
       res.json(data);
     })
})
//method that finds the id from the database and allows us to edit them on the app
app.put('/api/movies/:id', (req, res)=>{
  console.log("Update movie: "+req.params.id);
  console.log(req.body);

  MovieModel.findByIdAndUpdate(req.params.id,req.body, {new:true},
    (err,data)=>{
      res.send(data);
    })
})
//method that find the id from the database and deletes it.
app.delete('/api/movies/:id', (req, res)=>{
  console.log("Delete Movie: "+req.params.id);

  MovieModel.findByIdAndDelete(req.params.id, (err, data)=> {
      res.send(data);
    }
)
  });

//post method that logs a message and the data that we put in on our create page
app.post('/api/movies', (req,res)=>{
    console.log('post Successful');
    console.log(req.body)
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);
//creating our movie model
  MovieModel.create({
    title: req.body.title,
    year: req.body.year,
    poster: req.body.poster,
  });

  res.send("Item added");
});
//send the index.html file when it gets a html get request
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../build/index.html'));
});

//which port the app is running on, i.e, 4000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
