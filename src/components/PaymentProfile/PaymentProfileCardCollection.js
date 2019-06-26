import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import PaymentProfileCard from './PaymentProfileCard'

class PaymentProfileCardCollection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paymentMethods: this.props.paymentMethods,
        }
    }

    render() {
        const { onViewAddressClicked } = this.props;
        return (
            <Grid container spacing={3}>
                {this.state.paymentMethods.map((paymentMethod) =>
                    <Grid item xs={6} sm={4}
                          key={paymentMethod.currencyCode}>
                        <PaymentProfileCard paymentMethod={paymentMethod}
                                            onViewAddressClicked={onViewAddressClicked}/>
                    </Grid>
                )}
            </Grid>
        )
    }
}

PaymentProfileCardCollection.propTypes = {
    paymentMethods: PropTypes.arrayOf(
        PropTypes.shape({
            currencyCode: PropTypes.string.isRequired,
            data: PropTypes.string.isRequired
        })
    ).isRequired,
    onViewAddressClicked: PropTypes.func
};

export default PaymentProfileCardCollection;