import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import SaveProfileButton from './SaveProfileButton';

import { getSupportedCoins, saveProfile } from '../../utils/networkUtil';
import NewProfileFormPaymentMethods from './NewProfileFormPaymentMethods';
import { PROFILE_NAME_KEY, NewProfileFormProfileInfo } from './NewProfileFormProfileInfo';

import MessageSnackbar from '../Common/MessageSnackbar';

const styles = theme => ({
  heading: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  saveProfileButtonContainer: {
    textAlign: 'center',
    margin: theme.spacing(2),
  },
});

// TODO: Error dialog
class NewProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingSave: false,
      loadingCurrencies: true,
      savedProfileId: null, // TODO: this should be replaced with disabled (passed by page)
      allCurrencyCodes: [],
      formData: {
        formErrorMessage: null,
        profileInfo: {},
        paymentMethods: [],
      },
    };
    this.onPaymentMethodDataChange = this.onPaymentMethodDataChange.bind(this);
    this.onAddPaymentMethod = this.onAddPaymentMethod.bind(this);
    this.onPaymentMethodCurrencyCodeChange = this.onPaymentMethodCurrencyCodeChange.bind(this);
    this.onPaymentMethodDelete = this.onPaymentMethodDelete.bind(this);
    this.onProfileInfoChange = this.onProfileInfoChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onDismissErrorPrompt = this.onDismissErrorPrompt.bind(this);
  }

  /*
    Retrieves a list of supported currencies on mount
     */
  componentDidMount() {
    const { onLoadCurrenciesError } = this.props;
    getSupportedCoins()
      .then((coins) => {
        this.setState({
          loadingCurrencies: false,
          allCurrencyCodes: coins,
        });
      })
      .catch((err) => {
        this.setState({
          loadingCurrencies: false,
        });
        onLoadCurrenciesError(err);
      });
  }


  /*
    Profile info callbacks
     */
  onProfileInfoChange(key, newValue) {
    const { formData } = this.state;
    const { profileInfo } = formData;
    profileInfo[key] = newValue;
    this.setState({
      formData: {
        ...formData,
        profileInfo,
      },
    });
  }

  /*
    Payment method callbacks
     */
  onAddPaymentMethod() {
    const { formData } = this.state;
    const { paymentMethods } = formData;
    paymentMethods.push({
      currencyCode: null,
      data: null,
      hasError: false,
    });
    this.updatePaymentMethods(paymentMethods);
  }

  onPaymentMethodCurrencyCodeChange(index) {
    return (currencyCode) => {
      const { formData } = this.state;
      const { paymentMethods } = formData;
      paymentMethods[index] = {
        ...paymentMethods[index],
        currencyCode,
      };
      this.updatePaymentMethods(paymentMethods);
    };
  }

  onPaymentMethodDataChange(index) {
    return (data) => {
      const { formData } = this.state;
      const { paymentMethods } = formData;
      paymentMethods[index] = {
        ...paymentMethods[index],
        data,
      };
      this.updatePaymentMethods(paymentMethods);
    };
  }

  onPaymentMethodDelete(index) {
    return () => {
      const { formData } = this.state;
      const { paymentMethods } = formData;
      paymentMethods.splice(index, 1);
      this.updatePaymentMethods(paymentMethods);
    };
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
      const { onSaveSuccess, onSaveError } = this.props;
      // Define behavior for save success & fail
      const onSuccess = (profileId) => {
        this.setState({
          loadingSave: false,
          savedProfileId: profileId,
        });
        onSaveSuccess(profileId);
      };
      const onErr = (err) => {
        this.setState({
          loadingSave: false,
        });
        onSaveError(err);
      };

      // Set to loading, we're going to make a network call
      this.setState({ loadingSave: true });
      const { formData } = this.state;
      // Extract fields that we need
      const dataToSubmit = {
        profileName: formData.profileInfo[PROFILE_NAME_KEY],
        paymentMethods: formData.paymentMethods.map(paymentMethod => ({
          currencyCode: paymentMethod.currencyCode,
          data: paymentMethod.data,
        })),
      };
      saveProfile(dataToSubmit)
        .then((profileId) => {
          if (profileId) {
            // Saved Successfully!
            onSuccess(profileId);
          } else {
            // Somehow no profile ID returned, set error state
            const err = Error('Save endpoint returned success but no profile ID was returned');
            onErr(err);
          }
        })
        .catch((err) => {
          onErr(err);
        });
    }
  }

  /*
    On dismiss error prompt: Clears error message from state
     */
  onDismissErrorPrompt() {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        formErrorMessage: null,
      },
    });
  }

  /*
    Helper functions
     */
  updatePaymentMethods(paymentMethods) {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        paymentMethods,
      },
    });
  }

  // Validates payment methods - sets errors if any & returns false, or returns true if all is good
  validatePaymentMethods() {
    const { formData } = this.state;
    let currentPaymentMethods = formData.paymentMethods;
    let formError = null;
    if (currentPaymentMethods && currentPaymentMethods.length > 0) {
      // Iterate through payment methods - check that they have a currency code and data
      currentPaymentMethods = currentPaymentMethods.map((paymentMethod) => {
        if (paymentMethod.currencyCode && paymentMethod.data && paymentMethod.data.length > 0) {
          // No error
          return {
            ...paymentMethod,
            hasError: false,
          };
        }
        // Fields not filled in properly
        formError = 'Please check that all fields are filled in';
        return {
          ...paymentMethod,
          hasError: true,
        };
      });
    } else {
      formError = 'You must add at least one payment method';
    }
    this.setState({
      formData: {
        ...formData,
        formErrorMessage: formError,
        paymentMethods: currentPaymentMethods,
      },
    });
    return !formError;
  }

  render() {
    const {
      allCurrencyCodes, formData, loadingSave,
      savedProfileId, loadingCurrencies,
    } = this.state;
    const { classes } = this.props;
    const currentPaymentMethods = formData.paymentMethods;
    const disableSave = !!savedProfileId; // Disable saving if a profile was saved

    return (
      <Grid container>
        {
          formData.formErrorMessage ? (
            <MessageSnackbar
              message={formData.formErrorMessage}
              onDismiss={this.onDismissErrorPrompt}
              variant="error"
            />
          ) : <div />
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
            disabled={disableSave}
          />
        </Grid>
      </Grid>
    );
  }
}

NewProfileForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  onSaveSuccess: PropTypes.func.isRequired,
  onSaveError: PropTypes.func.isRequired,
  onLoadCurrenciesError: PropTypes.func.isRequired,
};

export default withStyles(styles)(NewProfileForm);
