import logo from './logo.svg';
import './App.css';
import './style.css';
import React, {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Axios from "axios";
import Header from "./components/layout/Header";
import MovieList from './components/pages/MovieList';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserContext from './context/UserContext';

function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });
    const [movies, setMovies] = useState([]);

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
            }

            console.log(tokenRes.data);
        };

        checkLoggedIn();

        Axios({
            method: "GET",
            url: "http://localhost:5000/movies",
        }).then((res) => {
            console.log(res.data.data);
            setMovies(res.data.data.results);
        });


    }, []);

    return (
       <>
          <BrowserRouter>
              <UserContext.Provider value={{ userData, setUserData }}>
                  <Header/>
                  <Switch>
                      <Route exact path="/" component={MovieList}/>
                      <Route path="/login" component={Login}/>
                      <Route path="/register" component={Register}/>
                  </Switch>
              </UserContext.Provider>
        </BrowserRouter>
      </>
    );
}

export default App;
