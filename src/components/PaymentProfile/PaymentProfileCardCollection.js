import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import PaymentProfileCard from './PaymentProfileCard';

class PaymentProfileCardCollection extends Component {
  constructor(props) {
    super(props);
    const { paymentMethods } = props;
    this.state = {
      paymentMethods,
    };
  }

  render() {
    const { onViewAddressClicked } = this.props;
    const { paymentMethods } = this.state;
    return (
      <Grid container spacing={3}>
        {paymentMethods.map(paymentMethod => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            key={paymentMethod.currencyCode}
          >
            <PaymentProfileCard
              paymentMethod={paymentMethod}
              onViewAddressClicked={onViewAddressClicked}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
}

PaymentProfileCardCollection.propTypes = {
  paymentMethods: PropTypes.arrayOf(
    PropTypes.shape({
      currencyCode: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
      displayName: PropTypes.string,
      imageUrl: PropTypes.string,
    }),
  ).isRequired,
  onViewAddressClicked: PropTypes.func.isRequired,
};

export default PaymentProfileCardCollection;
