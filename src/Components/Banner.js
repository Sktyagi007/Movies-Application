import { Component } from "react";
import axios from "axios"



class Banner extends Component {
    constructor(){
        super();
        this.state = {
            moviesBan:[],
        }
    }

    async componentDidMount(){
        const movieData = await axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=9e0eb3d0bb2415dbb8c0d34dc742ebf1");
        let random = Math.floor(Math.random() * movieData.data.results.length);
        let moviesArr = movieData.data.results[random]
    //    console.log(moviesArr);
       this.setState({
           moviesBan:moviesArr
       })
   
   }
    render() {
        // let bannerData = this.state.moviesBan;
        // let random = Math.floor(Math.random() * this.state.moviesBan.length);
        return (
            <div>
                <div className="card Banner-card">
                    <img src={`https://image.tmdb.org/t/p/original${this.state.moviesBan.backdrop_path}`} className="card-img-top Banner-img" alt="..."/>
                        <div className="card-body Banner-body">
                            <h5 className="card-title Banner-title">{this.state.moviesBan.title}</h5>
                            <p className="card-text Banner-text">{this.state.moviesBan.overview}</p>
                        </div>
                </div>

            </div>

        )
    }
}


export default Banner;