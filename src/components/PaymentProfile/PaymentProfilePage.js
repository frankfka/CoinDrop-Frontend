import React, {Component} from 'react';
import {getCoinInfo, getProfile} from '../../utils/networkUtil'
import {FullScreenLoading} from "../Common/Loading";
import PaymentMethodDetailDialog from "./PaymentMethodDetailsDialog";
import PaymentProfileCardCollection from "./PaymentProfileCardCollection";
import withPageContainer from "../Common/withPageContainer";
import ErrorPrompt from "../Common/ErrorPrompt";
import {Typography, withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';

const styles = (theme) => ({
    profileSection: {
        marginTop: theme.spacing(4)
    },
});

class PaymentProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            profileData: null,
            openDialogFor: null,
        };
        this.handlePaymentMethodDialogClose = this.handlePaymentMethodDialogClose.bind(this);
        this.paymentMethodClicked = this.paymentMethodClicked.bind(this);
        this.profileLoaded = this.profileLoaded.bind(this);
    }

    // TODO: Test that this returns properly in case of partial data
    render() {
        let {loading, error, openDialogFor, profileData} = this.state;
        let {classes} = this.props;

        // If loading, just show loading spinner
        if (loading) {
            return <FullScreenLoading/>
        }

        // If error in retrieving profile (and no profileData is present), show full-screen error dialog
        if (error && !profileData) {
            // TODO!
            return (
                <div>ERROR!</div>
            )
        }

        return (
            <div>
                {
                    openDialogFor && (
                        <PaymentMethodDetailDialog
                            paymentMethod={openDialogFor}
                            handleClose={this.handlePaymentMethodDialogClose}
                            isOpen={openDialogFor != null}
                        />
                    )
                }
                {
                    error && (
                        <ErrorPrompt message={'Some parts of this page may not have loaded properly.'}/>
                    )
                }
                <div>
                    <Typography variant='h3' component='h1'>
                        Payment Profile {profileData.profileName && `for ${profileData.profileName}`}
                    </Typography>
                    <Typography variant='subtitle1' component='h5'>
                        You may pay with any of the supported payment methods
                    </Typography>
                </div>
                <div className={classes.profileSection}>
                    <PaymentProfileCardCollection
                        paymentMethods={profileData.paymentMethods}
                        onViewAddressClicked={this.paymentMethodClicked}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        /*
        Attempt to fetch the profile
         */
        let profileId = this.props.match.params.id; // Retrieve ID from the URL
        if (!profileId) {
            // Invalid URL
            this.profileLoaded(null, Error('No Profile ID given'));
        }

        loadProfile(profileId)
            .then((profileData) => {
                addCoinData(profileData)
                    .then((completeProfileData) => {
                        this.profileLoaded(completeProfileData, null)
                    })
                    .catch((err) => {
                        // Not critical, we can still load the profile, but show a small error
                        this.profileLoaded(profileData, err);
                    })
            })
            .catch((err) => {
                // Profile not loaded, most likely because the ID does not exist
                this.profileLoaded(null, err);
            })

    }

    // Updates state as a result of loading operations
    profileLoaded(profileData, error) {
        console.log(`Profile loaded. Error: ${error != null}. Profile Loaded: ${profileData != null}`);
        this.setState({
            loading: false,
            error: error,
            profileData: profileData
        })
    }

    // Opens dialog for payment method
    paymentMethodClicked(paymentMethod) {
        this.setState({
            openDialogFor: paymentMethod
        })
    }

    // Closes payment method dialog
    handlePaymentMethodDialogClose() {
        this.setState({
            openDialogFor: null
        })
    }
}

// Retrieves a profile from mongo
async function loadProfile(profileId) {
    let profileData = await getProfile(profileId);
    if (!profileData || !(profileData.profileId === profileId)) {
        throw new Error("Profile Data is null or returned profile ID does not match input");
    }
    return profileData;
}

// Adds additional coin data to the payment profile and returns the new profile
async function addCoinData(profileData) {
    let currencyCodes = profileData.paymentMethods.map((paymentMethod) => {
        return paymentMethod.currencyCode
    });
    let coinData = await getCoinInfo(currencyCodes);
    if (!coinData || coinData.length === 0) {
        return profileData;
    }

    let newProfileData = {...profileData};
    newProfileData.paymentMethods = profileData.paymentMethods.map((paymentMethod) => {
        let retrievedCoinInfo = coinData.find((obj) => {
            return obj.currencyCode === paymentMethod.currencyCode
        });
        if (!retrievedCoinInfo) {
            // Info for the coin is not available, just return the data we have from our database
            return paymentMethod
        }
        // Combine the payment method with additional coin info
        return {
            ...paymentMethod,
            displayName: retrievedCoinInfo.displayName,
            imageUrl: retrievedCoinInfo.imageUrl
        }
    });
    return newProfileData;
}

PaymentProfilePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withPageContainer(withStyles(styles)(PaymentProfilePage));