import { Component } from "react";
import {Link} from "react-router-dom";

class Navbar extends Component{
    render(){
        return (
            <div>
                <nav className="navbar bg-light">
                    <div style={{display:"flex"}}>
                        <Link to="/" style={{textDecoration: "none"}}>
                        <h1 style={{marginLeft:"1rem",color:"blue", padding:"0.5px",cursor:"pointer"}}>Movies</h1>
                        </Link>
                        <Link to="/favourites" style={{textDecoration: "none"}}>
                        <h1 style={{marginLeft:"1rem",padding:"0.5px", color:"blue",cursor:"pointer"}}>Favourites</h1>
                        </Link>
                        
                    </div>  
                </nav>
            </div>
        ) 
    }
}

export default Navbar;