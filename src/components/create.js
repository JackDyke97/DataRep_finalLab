import React from 'react';
import axios from'axios';

//create component used to display in the app 

export class Create extends React.Component {

    constructor() {
        super();
//binding the onChange functions 
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangePoster = this.onChangePoster.bind(this);
//Set the actual inputs for the forms
        this.state = {
            Title: '',
            Year: '',
            Poster: ''
        }
    }
//The onchange functions for title, year and poster. These are used to target the values we enter
    onChangeTitle(e) {
        this.setState({
            Title: e.target.value
        });
    }

    onChangeYear(e){
        this.setState({
            Year: e.target.value
        });
    }

    onChangePoster(e){
        this.setState({
            Poster: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();
        alert("Movie: " + this.state.Title + " " + this.state.Year + " " + this.state.Poster);

        const newMovie = {
            title:this.state.Title,
            year:this.state.Year,
            poster: this.state.Poster
        }
//axios function to call localhost 4000
        axios.post('http://localhost:4000/api/movies', newMovie)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    render() {
        return (
            <div className='App'>
                <form onSubmit={this.onSubmit}>
                    {/* first div tag is for input control
                    The other tags are for setting the title,year and poster respectively  
                    The label is used to show the text on our website
                    the  input allows us to define what type we want and to tyle it using className
                    and also to define the value that is called*/}
                    <div className="form-group">
                        <label>Add Movie Title: </label>
                        <input type='text' className='form-control' value={this.state.Title}
                            onChange={this.onChangeTitle}></input>
                    </div>
                    <div className="form-group">
                        <label>Add Movie Year:</label>
                        <input type='text' className='form-control' value={this.state.Year}
                        onChange={this.onChangeYear}>
</input>
                    <div className='form-group'>
                        <label>Movies Poster:</label>
                        <textarea type='text' className='form-control' value={this.state.Poster}
                        onChange={this.onChangePoster}>

                        </textarea>
                    </div>
                    </div>
                    <div className="form-group">
                        <input type='submit' className='btn btn-primary' value='Add Movie'>
                        </input>
                    </div>
                </form>

            </div>
        );
    }
}