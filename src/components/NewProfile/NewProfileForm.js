import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import * as PropTypes from "prop-types";
import {EditablePaymentMethod} from "./EditablePaymentMethod";
import {AddPaymentMethod} from "./AddPaymentMethod";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {SaveProfileButton} from "./SaveProfileButton";

import {saveProfile} from "../../utils/networkUtil";
import {PROFILE} from "../../constants/routes";

class NewProfileForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            savedProfileId: null,
            allCurrencyCodes: props.allCurrencies, // All supported currencies minus the ones already added
            formData: {
                formErrorMessage: null,
                paymentMethods: []
            }
        };
        this.onPaymentMethodDataChange = this.onPaymentMethodDataChange.bind(this);
        this.onAddPaymentMethod = this.onAddPaymentMethod.bind(this);
        this.onPaymentMethodCurrencyCodeChange = this.onPaymentMethodCurrencyCodeChange.bind(this);
        this.onPaymentMethodDelete = this.onPaymentMethodDelete.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    render() {
        let { allCurrencyCodes, formData, loading, savedProfileId } = this.state;
        let currentPaymentMethods = formData.paymentMethods;
        let self = this;

        if (savedProfileId) {
            return (
                <Redirect to={PROFILE + savedProfileId}/>
            )
        }

        return (
            <Grid container>
                <Grid item xs={12}>
                    {
                        formData.formErrorMessage ? (
                            <div>{formData.formErrorMessage}</div>
                        ) : <div/>
                    }
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h5">
                        Payment Methods
                    </Typography>
                    {
                        currentPaymentMethods.length < 1 ? (
                            <div>Add at least one payment method.</div>
                        ) : <div/>
                    }
                    {currentPaymentMethods.map((paymentMethod, index) => {
                        return (
                            <EditablePaymentMethod
                                key={index}
                                currencyCode={paymentMethod.currencyCode}
                                data={paymentMethod.data}
                                onDataChange={self.onPaymentMethodDataChange(index)}
                                hasError={paymentMethod.hasError}
                                availableCurrencies={allCurrencyCodes}
                                onCurrencyCodeChange={self.onPaymentMethodCurrencyCodeChange(index)}
                                onDelete={self.onPaymentMethodDelete(index)}/>
                            )
                    })}
                    <AddPaymentMethod
                        onClick={this.onAddPaymentMethod}
                        isEnabled={currentPaymentMethods.length < 10 && !loading}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SaveProfileButton
                        onClick={this.onFormSubmit}
                        isEnabled={!loading}
                    />
                </Grid>
            </Grid>
        )
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
            this.setState({ loading: true });
            let formData = this.state.formData;
            // Extract fields that we need
            let dataToSubmit = {
              paymentMethods: formData.paymentMethods.map((paymentMethod) => {
                  return {
                      currencyCode: paymentMethod.currencyCode,
                      data: paymentMethod.data
                  }
              })
            };
            saveProfile(dataToSubmit)
                .then((res) => {
                    let profileId = res.data.profileId;
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
    allCurrencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default NewProfileForm;