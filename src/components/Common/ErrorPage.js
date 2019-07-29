import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import * as PropTypes from 'prop-types';
import genericErrorImage from './Images/generic_crypto.svg';

const genericErrorMessage = 'There was an error. Sorry about that!';

const useStyles = makeStyles(theme => ({
  errorContainer: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
  errorImage: {
    textAlign: 'center',
    maxWidth: '50%',
    marginBottom: theme.spacing(4),
  },
}));

export default function ErrorPage(props) {
  const classes = useStyles();
  let { errorImage, message } = props;
  if (!errorImage) {
    errorImage = genericErrorImage;
  }
  if (!message) {
    message = genericErrorMessage;
  }

  return (
    <div className={classes.errorContainer}>
      <img
        src={errorImage}
        alt="Error"
        className={classes.errorImage}
      />
      <div>
        <Typography variant="h3">
          Something isn&apos;t right.
        </Typography>
        <Typography variant="subtitle1">
          {message}
        </Typography>
      </div>
    </div>
  );
}

ErrorPage.defaultProps = {
  errorImage: '',
  message: '',
};

ErrorPage.propTypes = {
  errorImage: PropTypes.string,
  message: PropTypes.string,
};
