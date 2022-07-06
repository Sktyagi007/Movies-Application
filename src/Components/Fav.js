import { Component } from "react";
import axios from "axios";

class Fav extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            movies2:[],
            currGenre:"All Genres",
            genres:[]
        }
    }
    async componentDidMount() {
        let genreIds = { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science Fiction", 10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"}
        // const movieData = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=9e0eb3d0bb2415dbb8c0d34dc742ebf1&language=en-US&page=1");
        const movieData = await JSON.parse(localStorage.getItem("all-movies") || "[]");
        let tmp = [];
        tmp.push("All Genres");
        
        movieData.map((movieEle) =>{
            if(!tmp.includes(genreIds[movieEle.genre_ids[0]])){
                tmp.push(genreIds[movieEle.genre_ids[0]]);
            }
            
        })
        // console.log(movieArr);
        this.setState({
            movies: [...movieData],
            movies2:[...movieData],
            genres:[...tmp],
            currText:''
        })
    }
    handleChange = (genres)=>{
        if(genres == "All Genres"){
            this.setState({
                currGenre:genres
            },this.filterMovies)
        }else{
            this.setState({
                currGenre:genres
            },this.filterMovies)
        }
    }

    filterMovies = ()=>{
        let genreIds = { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science Fiction", 10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"}
        let filteredArr = [];
        let data = JSON.parse(localStorage.getItem("all-movies") || "[]");
        data.map((movieEle)=>{
            if(genreIds[movieEle.genre_ids[0]] == this.state.currGenre){
                filteredArr.push(movieEle);
            }
        })
        if(this.state.currGenre == "All Genres"){
            this.setState({
                movies:[...data],
                movies2:[...data]
            }) 
        }else{
            this.setState({
                movies:[...filteredArr],
                movies2:[...filteredArr]
            })
        }
    }
    changeText = (text)=>{
            this.setState({
                currText:text
            },this.searchFilter)
        
    }


    searchFilter = ()=>{
        if(this.state.currText != ''){
            let tmpArr = this.state.movies2.filter((movieObj) =>{
                let title = movieObj.original_title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase());
            })
            this.setState({
                movies:[...tmpArr]
            })
      
        }else{
            this.setState({
                movies:[...this.state.movies2]
            })
        }
    }
    sortDesc = ()=>{
        let tmp = this.state.movies.map((movieObj) => movieObj);
        tmp.sort(function(objA,objB){
            return objB.popularity - objA.popularity;
        })
        this.setState({
            movies:[...tmp],
            movies2:[...tmp]
        })
    }
    sortAsc = ()=>{
        let tmp = this.state.movies.map((movieObj) => movieObj);
        tmp.sort(function(objA,objB){
            return objA.popularity - objB.popularity;
        })
        this.setState({
            movies:[...tmp],
            movies2:[...tmp]
        })
    }
    ratingDesc = ()=>{
        let tmp = this.state.movies.map((movieObj) => movieObj);
        tmp.sort(function(objA,objB){
            return objB.vote_average - objA.vote_average;
        })
        this.setState({
            movies:[...tmp],
            movies2:[...tmp]
        })
    }
    ratingAsc = ()=>{
        let tmp = this.state.movies.map((movieObj) => movieObj);
        tmp.sort(function(objA,objB){
            return objA.vote_average - objB.vote_average;
        })
        this.setState({
            movies:[...tmp],
            movies2:[...tmp]
        })
    }
    removeMovies =(movieObj)=>{
        let data = JSON.parse(localStorage.getItem("all-movies") || "[]");
        let newArr = data.filter((movie) =>{
            return movieObj!=movie;
        }) 
        console.log(newArr);
        // localStorage.setItem(JSON.stringify("all-movies",newArr))
    }
    render() {
        let genreIds = { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science Fiction", 10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"}
        return (
            <div>
                <div className="row">
                    <div className="col-3">
                        <ul
                            className="list-group"
                            style={{ marginTop: "1rem", marginLeft: "3rem" }}
                        >
                            {this.state.genres.map((genres)=>(
                                this.state.currGenre == genres ?(
                                 <li className="list-group-item active">{genres}</li>
                                ):
                                (<li className="list-group-item" onClick={()=>this.handleChange(genres)} >{genres}</li>)
                            ))}
                            {/* <li className="list-group-item active" aria-current="true">
                                All Genres
                            </li>
                            
                            <li className="list-group-item">Action</li>
                            <li className="list-group-item">Adventure</li>
                            <li className="list-group-item">Horror</li> */}
                        </ul>
                    </div>
                    <div className="col-8">
                        <div className="row" style={{marginTop: "1rem"}}>
                            <div className="input-group">
                                <input type="text" aria-label="First name" className="form-control" placeholder="Search" onChange={(e)=>this.changeText(e.target.value)}/>
                                    <input type="number" aria-label="Last name" className="form-control"/>
                                    </div>
                                    <table
                                        className="table"
                                        style={{ marginTop: "1rem" }}
                                    >
                                        <thead>
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col">Genre</th>
                                                <th scope="col"> <i className="fa fa-caret-up" onClick={()=>this.sortDesc()}></i> Popularity <i className="fa fa-caret-down" onClick={()=>this.sortAsc()}></i></th>
                                                <th scope="col"><i className="fa fa-caret-up" onClick={()=>this.sortDesc()}></i> Rating <i className="fa fa-caret-down" onClick={()=>this.sortAsc()}></i></th>
                                                <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.movies.map((movieObj) => (
                                                <tr>
                                                    <th scope="row"> <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{ width: "10rem", marginRight: "0.5rem", borderRadius: "5px" }} /> {movieObj.title}</th>
                                                    <td>{genreIds[movieObj.genre_ids[0]]}</td>
                                                    <td>{movieObj.popularity}</td>
                                                    <td>{movieObj.vote_average}</td>
                                                    <td><button type="button" className="btn btn-danger" onClick={()=>this.removeMovies(movieObj)}>Delete</button></td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                            </div>
                            <div className="row">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a className="page-link" st style={{cursor: "pointer"}}>Previous</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link">1</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" style={{cursor: "pointer"}}>Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                );
  }
}

export default Fav;
