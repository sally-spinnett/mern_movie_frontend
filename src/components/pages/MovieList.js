import React, {useState, useEffect, useContext} from "react";
import Axios from "axios";
// import Markslider from "../layout/Markslider";
import UserContext from "../../context/UserContext";
import {useHistory} from "react-router-dom";

// for slider use
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
// end

const IMG_API = "https://image.tmdb.org/t/p/w1280"

// for slider use
const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

function valuetext(value) {
    return `${value}`;
}

function Markslider() {
    const classes = useStyles();
    const { userData, setUserData } = useContext(UserContext);
    const { movieTitle, setMovieTitle } = useState();
    const history = useHistory();
    const [error, setError] = useState();
    const [mark, setMark] = useState();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUserEmail = userData.user.email;
            const addMark = { loginUserEmail, movieTitle, mark };

            await Axios.post(
                "http://localhost:5000/users/mark",
                addMark
            );
            history.push("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };
    return (
        <div className={classes.root}>
            <form>
                <Typography id="discrete-slider" gutterBottom>
                    Mark this movie!
                </Typography>
                <Slider
                    defaultValue={6}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                    onChange={(e, value) => {
                        console.log(value)
                        setMark(e.target.value)
                    }}
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
// end

// original line
// const Movie = ({ title, poster_path, overview, vote_average }) => (
function Movie ({ title, poster_path, overview, vote_average }) {
    const {movieTitle, setMovieTitle} = useState();
    const {userData, setUserData} = useContext(UserContext);
    setMovieTitle(title);

    return (
        <>
            <div className='movie'>
                <img src={IMG_API + poster_path} alt={title}/>
                <div className="movie-info">
                    <h3>{title}</h3>
                    <span>{vote_average}</span>
                </div>

                <div className="movie-overview">
                    <h2>Overview:</h2>
                    <p>{overview}</p>
                </div>

                {userData.user ? (
                    <div className="movie-mark">
                        <Markslider/>
                    </div>
                ) : (
                    <div></div>
                )}

                {/*<div className="movie-mark">*/}
                {/*    <Markslider/>*/}
                {/*</div>*/}
            </div>
        </>
    )
    // <>
    //     <div className='movie'>
    //         <img src={IMG_API + poster_path} alt={title} />
    //         <div className="movie-info">
    //             <h3>{title}</h3>
    //             <span>{vote_average}</span>
    //         </div>
    //
    //         <div className="movie-overview">
    //             <h2>Overview:</h2>
    //             <p>{overview}</p>
    //         </div>
    //
    //         <div className="movie-mark">
    //             <Markslider />
    //         </div>
    //     </div>
    // </>
}

export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const { userData, setUserData } = useContext(UserContext);

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
        // {userData.user ? (
        //     <button onClick={logout}>Log out</button>
        // ) : (
        //     <>
        //         <button onClick={register}>Register</button>
        //         <button onClick={login}>Log in</button>
        //     </>
        // )}
    )
}
