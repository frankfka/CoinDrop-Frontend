import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Container from "@material-ui/core/Container";

import PaymentProfileCardCollection from "./PaymentProfileCardCollection";

class ValidPaymentProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profileData: this.props.profileData,
        }
    }

    render() {
        return (
            <div>
                <Container maxWidth="md">
                    <PaymentProfileCardCollection
                        paymentMethods={this.state.profileData.paymentMethods}
                        onViewAddressClicked={(currencyCode) => {console.log(currencyCode)}}
                    />
                </Container>
            </div>
        )
    }
}

ValidPaymentProfilePage.propTypes = {
    // Validate profile data prop
    profileData: PropTypes.shape({
      profileId: PropTypes.string.isRequired,
      paymentMethods: PropTypes.arrayOf(
          PropTypes.shape({
              currencyCode: PropTypes.string.isRequired,
              data: PropTypes.string.isRequired
          })
      ).isRequired
    }).isRequired
};

export default ValidPaymentProfilePage;