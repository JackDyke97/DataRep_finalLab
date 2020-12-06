import React from 'react';
import { MovieItem } from './movieitem';

export class Movies extends React.Component{
    //javascript that calls movieitem and uses map to display them individually 
    //this is called to the read component which display it in the browser
    render(){
                return this.props.movies.map( (movie)=>{
                    return <MovieItem movie={movie} ReloadData={this.props.ReloadData}></MovieItem>
                })
            }
       
      
    }
