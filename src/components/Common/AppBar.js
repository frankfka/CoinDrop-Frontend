import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import {HOME, NEW_PROFILE} from "../../constants/routes";
import appLogo from './Images/logo.png'
import {Hidden} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        justifyContent: 'space-between',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    },
    brandLink: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        marginRight: theme.spacing(1)
    },
    brandImg: {
        maxWidth: '36px',
        maxHeight: '36px',
        marginRight: theme.spacing(1)
    }
}));

export default function CoinDropAppBar() {
    const classes = useStyles();

    // TODO: backeend url

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Link to={HOME} className={classes.brandLink}>
                        <img src={appLogo} alt={'logo'} className={classes.brandImg}/>
                        <Hidden xsDown>
                            <Typography variant="h5">
                                Coindrop
                            </Typography>
                        </Hidden>
                    </Link>
                    <Link to={NEW_PROFILE}>
                        <Button variant="contained" color='secondary'>Create a Profile</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    )
}