import React, {useState, useEffect} from "react";
import Axios from "axios";
import Markslider from "../layout/Markslider";

const IMG_API = "https://image.tmdb.org/t/p/w1280"

const Movie = ({ title, poster_path, overview, vote_average }) => (
    <>
        <div className='movie'>
            <img src={IMG_API + poster_path} alt={title} />
            <div className="movie-info">
                <h3>{title}</h3>
                <span>{vote_average}</span>
            </div>

            <div className="movie-overview">
                <h2>Overview:</h2>
                <p>{overview}</p>
            </div>

            <div className="movie-mark">
                <Markslider />
            </div>

        </div>
    </>
);

export default function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        Axios({
            method: "GET",
            url: "http://localhost:5000/movies",
        }).then((res) => {
            console.log(res.data.data);
            setMovies(res.data.data.results);
        });
    }, []);

    return (
        <div className="movie-container">{
            movies.length > 0 && movies.map((movie) =>(
                <Movie key={movie.id} {...movie} />))
        }
            <p>jhdshsh</p>
        </div>
    )
}
