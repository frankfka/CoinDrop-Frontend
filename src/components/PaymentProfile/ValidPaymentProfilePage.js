import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Container from "@material-ui/core/Container";

import {getCoinInfo} from '../../utils/networkUtil'

import PaymentProfileCardCollection from "./PaymentProfileCardCollection";

class ValidPaymentProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            rawProfileData: this.props.profileData,
            rawCoinInfo: null,
            completeProfileData: null,
            error: null
        }
    }

    render() {
        let { completeProfileData, loading, error } = this.state;
        if (!loading && completeProfileData) {
            return (
                <div>
                    <Container maxWidth="md">
                        <PaymentProfileCardCollection
                            paymentMethods={completeProfileData.paymentMethods} // This includes additional coin info
                            onViewAddressClicked={(paymentMethod) => {console.log(paymentMethod)}}
                        />
                    </Container>
                </div>
            )
        } else {
            return null
        }
    }

    componentDidMount() {
        let currencyCodes = this.state.rawProfileData.paymentMethods.map(function(paymentMethod) {
            return paymentMethod.currencyCode;
        });
        getCoinInfo(currencyCodes)
            .then((res) => {
                this.coinInfoLoadSuccess(res.data.rawCoinInfo);
            })
            .catch((err) => {
                this.coinInfoLoadError(Error(err))
            })
    }

    coinInfoLoadSuccess(apiData) {
        // Arrays do not get spread by the operator
        let combinedProfileData = { ...this.state.rawProfileData };
        // Note: We can't be certain that all symbols were retrieved successfully
        combinedProfileData.paymentMethods = this.state.rawProfileData.paymentMethods.map((paymentMethod) => {
            let coinInfo = apiData.find((infoObj) => {
                return infoObj.currencyCode === paymentMethod.currencyCode
            });
            if (coinInfo) {
                return {
                    ...paymentMethod,
                    displayName: coinInfo.displayName,
                    imageUrl: coinInfo.imageUrl
                }
            } else {
                return paymentMethod
            }
        });
        this.setState({
            loading: false,
            rawCoinInfo: apiData,
            completeProfileData: combinedProfileData
        })
    }

    coinInfoLoadError(error) {
        console.error(error.message);
        console.error(error.response.data.error);
        this.setState({
            loading: false,
            error: error
        })
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