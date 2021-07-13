import React, {useState, useContext, useEffect} from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

export default function Homepage() {
    const { userData, setUserData } = useContext(UserContext);
    const [ userMark, setUserMark ] = useState([]);
    const history = useHistory();

    const Record = ({ marks, movieTitle }) => (
        <>
            <ul>
                <li>
                    <h3>Title:{movieTitle}</h3>
                    <h3>Your marks: {marks}</h3>
                </li>
            </ul>
        </>
    );

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            const tokenRes = await Axios.post(
                "http://localhost:5000/users/tokenIsValid",
                null,
                {headers: {"x-auth-token": token}}
            );
            // console.log(tokenRes.data);
            if (tokenRes.data) {
                const userRes = await Axios.get("http://localhost:5000/users/",
                    {headers: {"x-auth-token": token}}
                );
                console.log(userRes);
                setUserData({
                    token,
                    user: userRes.data,
                });
                // const ratingRes = await Axios.get("http://localhost:5000/users")
            }

            console.log(tokenRes.data);
        };

        checkLoggedIn();

        Axios({
            method: "GET",
            url: "http://localhost:5000/users/"+userData.user.username,
        }).then((res) => {
            console.log(res.data);
            setUserMark(res.data);
            // setMovies(res.data.data.results);
        });


    }, []);

    console.log(userData.user.username);

    return (
        <>
            <div className="page">
                <h2>My ratings</h2>
                {
                    userMark.map((mark) => (
                        <Record key={mark.id} {...mark}/>
                    ))
                }
            </div>

            {/*<nav className="auth-options">*/}
            {/*    {userData.user ? (*/}
            {/*        <>*/}
            {/*            <button onClick={homepage}>My ratings</button>*/}
            {/*            <button onClick={logout}>Log out</button>*/}
            {/*        </>*/}
            {/*    ) : (*/}
            {/*        <>*/}
            {/*            <button onClick={register}>Register</button>*/}
            {/*            <button onClick={login}>Log in</button>*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*    /!*<button onClick={register}>Register</button>*!/*/}
            {/*    /!*<button onClick={login}>Log in</button>*!/*/}
            {/*</nav>*/}
        </>
    );
}