import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {red} from "@material-ui/core/colors";
import {Grid} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    footer: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        flexGrow: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.grey["50"],
        textAlign: 'center'
    },
    heart: {
        color: red["700"]
    },
    links: {
        display: 'flex',
        listStyle: 'none',
        justifyContent: 'center'
    },
    linkItem: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        color: theme.palette.secondary.main,
        textDecoration: 'none'
    }
}));

export default function Footer() {
    const classes = useStyles();

    // TODO: Links
    return (
        <Grid container className={classes.footer}>
            <Grid xs={12} md={6}>
                <Typography variant='body1' component='p'>
                    <div>© 2019 Frank Jia</div>
                </Typography>
                <Typography variant='body2' component='p'>
                    <div>Made with <span className={classes.heart}>❤</span> in Canada</div>
                </Typography>
            </Grid>
            <Grid xs={12} md={6}>
                <Typography variant='body1' component='p'>
                <div className={classes.links}>
                    <a className={classes.linkItem} href='https://google.com'>Github</a>
                    <a className={classes.linkItem} href='https://google.com'>Contact</a>
                    <a className={classes.linkItem} href='https://google.com'>Terms</a>
                    <a className={classes.linkItem} href='https://google.com'>About</a>
                </div>
                </Typography>
            </Grid>
        </Grid>
    )
}