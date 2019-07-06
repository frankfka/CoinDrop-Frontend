import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {getCoinInfo} from '../../utils/networkUtil'

import PaymentProfileCardCollection from "./PaymentProfileCardCollection";
import PaymentMethodDetailDialog from "./PaymentMethodDetailsDialog";
import {FullScreenLoading} from "../Common/Loading";
import withPageContainer from "../Common/withPageContainer";

class ValidPaymentProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            rawProfileData: this.props.profileData,
            rawCoinInfo: null,
            completeProfileData: null,
            openDialogFor: null,
            error: null
        };
        this.handlePaymentMethodDialogClose = this.handlePaymentMethodDialogClose.bind(this);
        this.paymentMethodClicked = this.paymentMethodClicked.bind(this);
    }

    render() {
        // TODO: deal with this error somehow
        let { completeProfileData, loading, error, openDialogFor } = this.state;
        if (!loading && completeProfileData) {
            return (
                <div>
                    {
                        openDialogFor ? (
                            <PaymentMethodDetailDialog
                                paymentMethod={openDialogFor}
                                handleClose={this.handlePaymentMethodDialogClose}
                                isOpen={openDialogFor != null}
                            />
                        ) : <div/>
                    }
                    <div>
                        <PaymentProfileCardCollection
                            paymentMethods={completeProfileData.paymentMethods} // This includes additional coin info
                            onViewAddressClicked={this.paymentMethodClicked}
                        />
                    </div>
                </div>
            )
        } else {
            return <FullScreenLoading/>
        }
    }

    componentDidMount() {
        let currencyCodes = this.state.rawProfileData.paymentMethods.map(function(paymentMethod) {
            return paymentMethod.currencyCode;
        });
        getCoinInfo(currencyCodes)
            .then((coinInfo) => {
                this.coinInfoLoadSuccess(coinInfo);
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

    paymentMethodClicked(paymentMethod) {
        this.setState({
            openDialogFor: paymentMethod
        })
    }

    handlePaymentMethodDialogClose() {
        this.setState({
            openDialogFor: null
        })
    }

    // TODO: Display this error somehow
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

export default withPageContainer(ValidPaymentProfilePage);