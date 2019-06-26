import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'

class PaymentProfileCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paymentMethod: this.props.paymentMethod,
        };
        // Bind functions to self
        this.onClick = this.onClick.bind(this);
    }

    // On click of view payment data button
    onClick(e) {
        e.preventDefault();
        this.props.onViewAddressClicked(this.state.paymentMethod.currencyCode)
    }

    render() {
        return (
            <Card>
                <CardMedia
                    image="https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png" // TODO: Image
                    title="BTC" // TODO
                    component="img"
                />
                <CardContent>
                    <Typography color="textSecondary">
                        BTC
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Bitcoin
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="medium" color="primary" onClick={this.onClick}>
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
        data: PropTypes.string.isRequired
    }).isRequired,
    onViewAddressClicked: PropTypes.func
};

export default PaymentProfileCard;