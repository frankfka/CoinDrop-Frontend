import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {red} from "@material-ui/core/colors";
import {Grid} from "@material-ui/core";
import {TERMS} from "../../constants/routes";

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
    },
    portfolioLink: {
        color: theme.palette.secondary.main,
        textDecoration: 'none'
    }
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <Grid container className={classes.footer}>
            <Grid item xs={12} md={6}>
                <div>
                    <Typography variant='body1' component='p'>
                        © 2019&nbsp;
                        <a href="http://jiafrank.com/"
                           className={classes.portfolioLink}
                           target='_blank'
                           rel="noopener noreferrer">
                            Frank Jia
                        </a>
                    </Typography>
                </div>
                <div>
                    <Typography variant='body2' component='p'>
                        Made with <span className={classes.heart}>❤</span> in Canada
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={12} md={6}>
                <div className={classes.links}>
                    <Typography variant='body1' component='p'>
                        <a
                            className={classes.linkItem}
                            href='https://forms.gle/aQweN82L8WCBumeK6'
                            target='_blank'
                            rel="noopener noreferrer"
                        >
                            Contact
                        </a>
                        <a className={classes.linkItem}
                           href={TERMS}
                           target='_blank'
                           rel="noopener noreferrer"
                        >
                            Terms
                        </a>
                    </Typography>
                </div>
            </Grid>
        </Grid>
    )
}