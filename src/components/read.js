import React from 'react';
import { Movies } from './movies';
import axios from 'axios';
//Read component called in the app

export class Read extends React.Component {

    constructor(){
        super();

        this.ReloadData = this.ReloadData.bind(this);
    }

    //state object to hold data associated with the component
    state = {
        //our array that hold all the movie info
        movies: []
    };
//this method gets executed and uses axios to retrieve data from api/movies
//setting it equal to the movies array and using it to display the api data
//have an error function that will catch any errors
    componentDidMount() {
        axios
          .get('http://localhost:4000/api/movies')
          .then((response) => {
            this.setState({ movies: response.data });
          })
          .catch((error) => {
            console.log(error);
          });
    }

    //function to automatically refresh our page
    ReloadData(){
         axios
           .get("http://localhost:4000/api/movies")
           .then((response) => {
             this.setState({ movies: response.data });
           })
           .catch((error) => {
             console.log(error);
           });
    }

    //our return function to call the movie component
    render() {
        return (
            <div>
                <h3>Hello from read Component.</h3>
                <Movies movies={this.state.movies} ReloadData={this.ReloadData}></Movies>
            </div>
        );
    }
}