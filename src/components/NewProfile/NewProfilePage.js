import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import * as PropTypes from 'prop-types';

import NewProfileForm from './NewProfileForm';
import { PROFILE } from '../../constants/routes';
import NewProfileSuccessDialog from './NewProfileSuccessDialog';

const styles = theme => ({
  newProfileForm: {
    marginTop: theme.spacing(2),
  },
});

// TODO: Show error
class NewProfilePage extends Component {
  constructor(props) {
    super(props);
    this.onLoadCurrencyError = this.onLoadCurrencyError.bind(this);
    this.onSaveSuccess = this.onSaveSuccess.bind(this);
    this.onSaveError = this.onSaveError.bind(this);
    this.onSaveSuccessDialogClose = this.onSaveSuccessDialogClose.bind(this);
    this.state = {
      savedProfileId: null,
      navigateToProfile: false,
      showSuccessDialog: false,
      error: null,
    };
  }

  onSaveSuccessDialogClose() {
    // Push to profile page
    this.setState({
      navigateToProfile: true,
      showSuccessDialog: false,
    });
  }

  onSaveSuccess(profileId) {
    // Set state to show success
    this.setState({
      savedProfileId: profileId,
      showSuccessDialog: true,
    });
  }

  onSaveError(err) {
    this.setState({
      error: err,
    });
  }

  onLoadCurrencyError(err) {
    this.setState({
      error: err,
    });
  }

  render() {
    const { classes } = this.props;
    const { savedProfileId, navigateToProfile, showSuccessDialog } = this.state;

    if (savedProfileId && navigateToProfile) {
      // Use React Router to push to new profile
      return (
        <Redirect to={PROFILE + savedProfileId} />
      );
    }

    let profileLink = ''; // Full link to profile to show in a dialog
    if (savedProfileId && window) { // Checks that current window is defined
      // Build the link
      const rootUrl = `${window.location.protocol}//${window.location.host}`;
      profileLink = rootUrl + PROFILE + savedProfileId;
    }

    return (
      <div>
        {
          showSuccessDialog
          && (
          <NewProfileSuccessDialog
            profileLink={profileLink}
            isOpen={showSuccessDialog}
            handleClose={this.onSaveSuccessDialogClose}
          />
          )
        }

        <Typography variant="h3" component="h1">New Profile</Typography>
        <Typography variant="subtitle1" component="h5">
          Create a unique payment profile for others to pay you in cryptocurrency.
        </Typography>
        <div className={classes.newProfileForm}>
          <NewProfileForm
            onLoadCurrenciesError={this.onLoadCurrencyError}
            onSaveError={this.onSaveError}
            onSaveSuccess={this.onSaveSuccess}
          />
        </div>
      </div>
    );
  }
}

NewProfilePage.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(NewProfilePage);
