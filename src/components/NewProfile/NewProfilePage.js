import React, {Component} from 'react';
import * as PropTypes from "prop-types"
import NewProfileForm from "./NewProfileForm";
import {withStyles, Typography} from "@material-ui/core";
import withPageContainer from "../Common/withPageContainer";

const styles = (theme) => ({
    newProfileForm: {
        marginTop: theme.spacing(2)
    },
});

class NewProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Typography variant='h3' component='h1'>New Profile</Typography>
                <Typography variant='subtitle1' component='h5'>
                    Create a unique payment profile for others to pay you in cryptocurrency.
                </Typography>
                <div className={classes.newProfileForm}>
                    <NewProfileForm
                        allCurrencies={['BTC', 'XRP', 'ETH','XLM', 'LINK', 'XMR','BAT', 'ETC', 'BSV','BCH']}
                    />
                </div>
            </div>
        )
    }
}

export default withPageContainer(withStyles(styles)(NewProfilePage));

NewProfilePage.propTypes = {
    classes: PropTypes.object.isRequired
};