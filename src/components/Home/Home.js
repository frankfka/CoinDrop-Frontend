import React from 'react';
import {Grid, Hidden, makeStyles, Typography} from "@material-ui/core";
import headerImg from './home_header.svg'
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom';
import {NEW_PROFILE} from "../../constants/routes";

const useStyles = makeStyles((theme) => ({
    header: {
        marginTop: theme.spacing(8)
    },
    headerSubtitle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    headerImg: {
        float: 'right',
        maxWidth: '85%',
        padding: 'auto'
    },
    explainContainer: {
        marginTop: theme.spacing(20),
        marginBottom: theme.spacing(12)
    },
    explainHeader: {
        textAlign: 'center'
    },
    explainSection: {
        marginTop: theme.spacing(2)
    }
}));

export default function HomePage() {
    const classes = useStyles();

    return (
        <div>
            <Grid container className={classes.header}>
                <Grid item xs={12} sm={8} md={6}>
                    <Typography variant='h2' component='h1'>
                        Get Paid Easily in Crypto.
                    </Typography>
                    <Typography variant='h5' color='secondary' className={classes.headerSubtitle}>
                        Easily share your cryptocurrency payment information with a unique payment profile.
                    </Typography>
                    <Link to={NEW_PROFILE}>
                        <Button
                            size='large'
                            variant='contained'
                            color='secondary'
                        >
                            Create Yours
                        </Button>
                    </Link>
                </Grid>
                <Hidden smDown>
                    <Grid item sm={4} md={6}>
                        <img src={headerImg} alt='header' className={classes.headerImg}/>
                    </Grid>
                </Hidden>
            </Grid>

            <Grid container className={classes.explainContainer} spacing={4}>
                <Grid item xs={12}>
                    <Typography variant='h4' component='h3' className={classes.explainHeader}>
                        How it Works
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4} className={classes.explainSection}>
                    <Typography variant='h6' component='h6'>
                        Create a Profile
                    </Typography>
                    <Typography variant='body1' component='p'>
                        No personal information required. Choose your cryptocurrencies and fill in
                        your public addresses.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4} className={classes.explainSection}>
                    <Typography variant='h6' component='h6'>
                        Share Your Link
                    </Typography>
                    <Typography variant='body1' component='p'>
                        Taking payment for an order? Splitting the bill with a friend? Share your profile with whomever.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4} className={classes.explainSection}>
                    <Typography variant='h6' component='h6'>
                        Get Paid Easily
                    </Typography>
                    <Typography variant='body1' component='p'>
                        Payees can easily see and scan your cryptocurrency addresses, making payments a breeze.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}