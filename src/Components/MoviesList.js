import { Component } from "react";
// import {Movies} from "../movieData";
import axios from "axios"

class MoviesList extends Component{
    constructor(){
        super();
        this.state = {
            pArr:[1],
            movies:[],
            hover:"",
            currPage:1,
            Favourites:[]
        }
    }
    
    async componentDidMount(){
         const movieData = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=9e0eb3d0bb2415dbb8c0d34dc742ebf1&language=en-US&page=${this.state.currPage}`);
         let moviesArr = movieData.data.results
        // console.log(movieArr);
        this.setState({
            movies:[...moviesArr]
        })
    
    }

    changeMovies = async ()=>{
        const movieData = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=9e0eb3d0bb2415dbb8c0d34dc742ebf1&language=en-US&page=${this.state.currPage}`);
         let moviesArr = movieData.data.results
        // console.log(movieArr);
        this.setState({
            movies:[...moviesArr]
        })
    }

    nextPage = ()=>{
        let pageArr = this.state.pArr;
        this.setState({
            pArr:[...pageArr,pageArr.length+1],
            currPage: this.state.currPage+1
        },this.changeMovies)
    }
    prevPage = ()=>{
        let pageArr = this.state.pArr;
        if(pageArr.length>1){
            pageArr.pop();
            this.setState({
                pArr:[...pageArr],
                currPage: this.state.currPage-1
            },this.changeMovies)
        }
    }
    pageChange = (pageNum)=>{
        let cPage = pageNum.target.innerHTML;
        if(cPage!=this.state.currPage){
            this.setState({
                currPage:cPage
            },this.changeMovies)
        }
        
    }
    storage = (movieObj)=>{
        let oldData = JSON.parse(localStorage.getItem("all-movies") || "[]");
        if(this.state.Favourites.includes(movieObj.id)){
            oldData = oldData.filter((movie)=>movie.id!=movieObj.id);
        }else{
            oldData.push(movieObj);
        }
        localStorage.setItem("all-movies",JSON.stringify(oldData));
        this.handleFavourites();
    }
    handleFavourites = ()=>{
        let oldData = JSON.parse(localStorage.getItem("all-movies") || "[]");
        let temp = oldData.map((movie)=>movie.id);
        this.setState({
            Favourites:[...temp]
        })
    }

    render(){
        
        return(
            <div>
                <h1 style={{textAlign: "center", marginBottom:"1rem"}}>Trending</h1>
                <div className="movies-list" style={{display:"flex",justifyContent:"space-around", flexWrap:"wrap", gap:"1rem"}}>
                    {this.state.movies.map((movieEle) =>(
                        <div className="card movie-card" onMouseEnter={()=> this.setState({hover:movieEle.id})} onMouseLeave={()=> this.setState({hover:""})}>
                        <img src={`https://image.tmdb.org/t/p/original${movieEle.backdrop_path}`} className="card-img-top movie-img" alt="..."/>
                        <h5 className="card-title movie-title">{movieEle.title}</h5>
                        {this.state.hover == movieEle.id && 
                        (<a className="btn btn-primary movie-btn" onClick={() => this.storage(movieEle)}>{this.state.Favourites.includes(movieEle.id)? "remove from favourites": "add favourites"}</a>)}
                    </div>
                    ))}
                </div>
                <nav aria-label="Page navigation example" style={{display: "flex", justifyContent: "center", marginTop: "0.6rem"}}>
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" onClick={()=>this.prevPage()} style={{cursor: "pointer"}}>Previous</a></li>
                        {this.state.pArr.map((pageCount)=>(
                            <li className="page-item"><a className="page-link" onClick={(e)=>this.pageChange(e)} style={{cursor:"pointer"}}>{pageCount}</a></li>
                        ))}
                        <li className="page-item"><a className="page-link" onClick={()=>this.nextPage()} style={{cursor: "pointer"}}>Next</a></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default MoviesList;