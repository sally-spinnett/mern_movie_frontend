import React, {useContext, useState} from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Axios from "axios";

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

function valuetext(value) {
    return `${value}`;
}

export default function Markslider() {
    const classes = useStyles();
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    const [error, setError] = useState();
    const [mark, setMark] = useState();

    const submit = async (e) => {
        e.preventDefault();
        // try {
        //     const loginUserEmail = userData.user.email;
        //     const movieTitle = null;
        //     // const marks = null;
        //     const addMark = { loginUserEmail, movieTitle, mark };
        //
        //     // setMark({
        //     //
        //     // })
        //
        //     await Axios.post(
        //         "http://localhost:5000/users/mark",
        //         addMark
        //     );
        //     history.push("/");
        // } catch (err) {
        //     err.response.data.msg && setError(err.response.data.msg);
        // }
    }
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
                        //setMark(e.target.value)
                    }}
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}