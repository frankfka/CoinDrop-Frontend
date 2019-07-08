import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import {NEW_PROFILE} from "../../constants/routes";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        color: theme.palette.getContrastText(theme.palette.primary.main)
    },
}));

export default function CoinDropAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        CoinDrop
                    </Typography>
                    <Link to={NEW_PROFILE}>
                        <Button variant="contained" color='secondary'>Create a Profile</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    )
}