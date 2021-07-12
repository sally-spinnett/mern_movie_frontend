import React, {useContext} from "react";
import UserContext from "../../context/UserContext";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

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

    // const { userData, setUserData } = useContext(UserContext);
    return (
        <div className={classes.root}>
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
            />
        </div>
    );
}