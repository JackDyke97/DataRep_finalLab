import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";

export class MovieItem extends React.Component {
  //Card function that calls title, year and poster from our movie array
  //this allows us to call it to movies.js which sends it to our read.js

  //constructor to bind deletemovie button to deletemovie function

  constructor() {
    super();

    this.DeleteMovie = this.DeleteMovie.bind(this);
  }

  //function for delete movie button
  DeleteMovie(e) {
      e.preventDefault();
    console.log("Delete: " + this.props.movie._id);

    axios.delete("http://localhost:4000/api/movies/"+this.props.movie._id)
      .then(()=>{
          this.props.ReloadData();
      })
      .catch();
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Header>{this.props.movie.title}</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <img src={this.props.movie.poster} width="200" height="200"></img>
              <footer className="blockquote-footer">
                <p>{this.props.movie.year}</p>
              </footer>
            </blockquote>
          </Card.Body>

          <Link to={"/edit/"+ this.props.movie._id} className="btn btn-primary">Edit</Link>

          {/* delete button that calls our DeleteMovie Function */}
          <Button variant="danger" onClick={this.DeleteMovie}>
            Delete
          </Button>
        </Card>
      </div>
    );
  }
}
