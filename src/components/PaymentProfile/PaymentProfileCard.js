import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import {withStyles} from "@material-ui/core";
import placeholderImg from './Images/icon_placeholder.svg'

const styles = (theme) => ({
    currencyImage: {
        padding: theme.spacing(4),
        paddingBottom: theme.spacing(2),
        maxWidth: '256px'
    },
});

class PaymentProfileCard extends Component {

    constructor(props) {
        super(props);
        // Bind functions to self
        this.onClick = this.onClick.bind(this);
    }

    // On click of view payment data button
    onClick(e) {
        e.preventDefault();
        this.props.onViewAddressClicked(this.props.paymentMethod)
    }

    render() {
        let {classes} = this.props;
        let {currencyCode, displayName, imageUrl} = this.props.paymentMethod;
        return (
            <Card>
                <div className={classes.currencyImage}>
                    <CardMedia
                        image={imageUrl == null ? placeholderImg : imageUrl}
                        title={currencyCode}
                        component="img"
                    />
                </div>
                <CardContent>
                    <Typography color="textSecondary">
                        {currencyCode}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {displayName == null ? currencyCode : displayName}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="medium" color="secondary" onClick={this.onClick}>
                        View Address
                    </Button>
                </CardActions>
            </Card>
        )
    }

}

PaymentProfileCard.propTypes = {
    // Validate payment profile
    paymentMethod: PropTypes.shape({
        currencyCode: PropTypes.string.isRequired,
        data: PropTypes.string.isRequired,
        displayName: PropTypes.string,
        imageUrl: PropTypes.string
    }).isRequired,
    onViewAddressClicked: PropTypes.func,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaymentProfileCard);