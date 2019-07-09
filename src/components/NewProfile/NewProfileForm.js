import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {SaveProfileButton} from "./SaveProfileButton";

import {getSupportedCoins, saveProfile} from "../../utils/networkUtil";
import {PROFILE} from "../../constants/routes";
import {withStyles} from "@material-ui/core";
import NewProfileFormPaymentMethods from "./NewProfileFormPaymentMethods";
import NewProfileFormProfileInfo from "./NewProfileFormProfileInfo";
import {PROFILE_NAME_KEY} from "./NewProfileFormProfileInfo";
import MessageSnackbar from "../Common/MessageSnackbar";

const styles = (theme) => ({
    heading: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2)
    },
    saveProfileButtonContainer: {
        textAlign: 'center',
        margin: theme.spacing(2)
    }
});

class NewProfileForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingSave: false,
            loadingCurrencies: true,
            error: null,
            savedProfileId: null,
            allCurrencyCodes: [],
            formData: {
                formErrorMessage: null,
                profileInfo: {},
                paymentMethods: []
            }
        };
        this.onPaymentMethodDataChange = this.onPaymentMethodDataChange.bind(this);
        this.onAddPaymentMethod = this.onAddPaymentMethod.bind(this);
        this.onPaymentMethodCurrencyCodeChange = this.onPaymentMethodCurrencyCodeChange.bind(this);
        this.onPaymentMethodDelete = this.onPaymentMethodDelete.bind(this);
        this.onProfileInfoChange = this.onProfileInfoChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onDismissErrorPrompt = this.onDismissErrorPrompt.bind(this);
    }

    render() {
        let {allCurrencyCodes, formData, loadingSave,
            savedProfileId, loadingCurrencies} = this.state;
        let {classes} = this.props;
        let currentPaymentMethods = formData.paymentMethods;

        // If payment profile was made, redirect to the created profile
        if (savedProfileId) {
            return (
                <Redirect to={PROFILE + savedProfileId}/>
            )
        }

        return (
            <Grid container>
                {
                    formData.formErrorMessage ? (
                        <MessageSnackbar
                            message={formData.formErrorMessage}
                            onDismiss={this.onDismissErrorPrompt}
                            variant={'error'}
                        />
                    ) : <div/>
                }
                <Grid item xs={12} className={classes.heading}>
                    <Typography variant="h5" component="h5">
                        Profile Information
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <NewProfileFormProfileInfo
                        profileInfo={formData.profileInfo}
                        onProfileInfoChange={this.onProfileInfoChange}
                    />
                </Grid>
                <Grid item xs={12} className={classes.heading}>
                    <Typography variant="h5" component="h5">
                        Payment Methods
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <NewProfileFormPaymentMethods
                        loading={loadingCurrencies}
                        currentPaymentMethods={currentPaymentMethods}
                        allCurrencyCodes={allCurrencyCodes}
                        enableAddButton={currentPaymentMethods.length < 10 && !loadingSave}
                        showHelperText={currentPaymentMethods.length === 0}
                        onDataChange={this.onPaymentMethodDataChange}
                        onCurrencyCodeChange={this.onPaymentMethodCurrencyCodeChange}
                        onDelete={this.onPaymentMethodDelete}
                        onAdd={this.onAddPaymentMethod}
                    />
                </Grid>
                <Grid item xs={12} className={classes.saveProfileButtonContainer}>
                    <SaveProfileButton
                        onClick={this.onFormSubmit}
                        loading={loadingSave}
                    />
                </Grid>
            </Grid>
        )
    }

    /*
    Retrieves a list of supported currencies on mount
     */
    componentDidMount() {
        getSupportedCoins()
            .then((coins) => {
                this.setState({
                    loadingCurrencies: false,
                    allCurrencyCodes: coins
                })
            })
            .catch((err) => {
                this.setState({
                    error: err,
                    loadingCurrencies: false
                })
            })
    }


    /*
    Profile info callbacks
     */
    onProfileInfoChange(key, newValue) {
        let profileInfo = this.state.formData.profileInfo;
        profileInfo[key] = newValue;
        this.setState({
            formData: {
                ...this.state.formData,
                profileInfo: profileInfo
            }
        })
    }

    /*
    Payment method callbacks
     */
    onAddPaymentMethod() {
        let paymentMethods = this.state.formData.paymentMethods;
        paymentMethods.push({
            currencyCode: null,
            data: null,
            hasError: false
        });
        this.updatePaymentMethods(paymentMethods)
    }

    onPaymentMethodCurrencyCodeChange(index) {
        return (currencyCode) => {
            let paymentMethods = this.state.formData.paymentMethods;
            paymentMethods[index] = {
                ...paymentMethods[index],
                currencyCode: currencyCode
            };
            this.updatePaymentMethods(paymentMethods);
        }
    }

    onPaymentMethodDataChange(index) {
        return (data) => {
            let paymentMethods = this.state.formData.paymentMethods;
            paymentMethods[index] = {
                ...paymentMethods[index],
                data: data
            };
            this.updatePaymentMethods(paymentMethods)
        }
    }

    onPaymentMethodDelete(index) {
        return () => {
            let paymentMethods = this.state.formData.paymentMethods;
            paymentMethods.splice(index, 1);
            this.updatePaymentMethods(paymentMethods)
        }
    }

    /*
    On Submit:
        Validate form data
        Set state to loading
        Make call to service to save profile
        Display result, redirect to page when done
     */
    onFormSubmit() {
        if (this.validatePaymentMethods()) {
            // Set to loading, we're going to make a network call
            this.setState({loading: true});
            let formData = this.state.formData;
            // Extract fields that we need
            let dataToSubmit = {
                profileName: formData.profileInfo[PROFILE_NAME_KEY],
                paymentMethods: formData.paymentMethods.map((paymentMethod) => {
                    return {
                        currencyCode: paymentMethod.currencyCode,
                        data: paymentMethod.data
                    }
                })
            };
            saveProfile(dataToSubmit)
                .then((profileId) => {
                    if (profileId) {
                        // Use Redirect to push to new address
                        this.setState({
                            loading: false,
                            savedProfileId: profileId
                        })
                    } else {
                        // Somehow no profile ID returned, set error state
                        this.setState({
                            error: Error('Save endpoint returned success but no profile ID was returned')
                        })
                    }
                })
                .catch((err) => {
                    // Set error state
                    this.setState({
                        error: err,
                        loading: false
                    })
                })
        }
    }

    /*
    On dismiss error prompt: Clears error message from state
     */
    onDismissErrorPrompt() {
        this.setState({
            formData: {
                ...this.state.formData,
                formErrorMessage: null
            }
        })
    }

    /*
    Helper functions
     */
    updatePaymentMethods(paymentMethods) {
        this.setState({
            formData: {
                ...this.state.formData,
                paymentMethods: paymentMethods
            }
        });
    }

    // Validates payment methods - sets errors if any & returns false, or returns true if all is good
    validatePaymentMethods() {
        let currentPaymentMethods = this.state.formData.paymentMethods;
        let formError = null;
        if (currentPaymentMethods && currentPaymentMethods.length > 0) {
            // Iterate through payment methods - check that they have a currency code and data
            currentPaymentMethods = currentPaymentMethods.map((paymentMethod) => {
                if (paymentMethod.currencyCode && paymentMethod.data && paymentMethod.data.length > 0) {
                    // No error
                    return {
                        ...paymentMethod,
                        hasError: false
                    }
                } else {
                    // Fields not filled in properly
                    formError = 'Please check that all fields are filled in';
                    return {
                        ...paymentMethod,
                        hasError: true
                    }
                }
            });
        } else {
            formError = 'You must add at least one payment method';
        }
        this.setState({
            formData: {
                ...this.state.formData,
                formErrorMessage: formError,
                paymentMethods: currentPaymentMethods
            }
        });
        return !formError
    }

}

NewProfileForm.propTypes = {
    allCurrencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewProfileForm);