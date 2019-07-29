import Fab from '@material-ui/core/Fab';
import Save from '@material-ui/icons/Save';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(2),
  },
}));

export default function SaveProfileButton(props) {
  const classes = useStyles();
  const { onClick, loading } = props;
  return (
    <Fab
      variant="extended"
      size="large"
      color="primary"
      aria-label="Add"
      disabled={loading}
      className={classes.margin}
      onClick={onClick}
    >
      <Save className={classes.extendedIcon} />
      {loading ? 'Loading' : 'Create Payment Profile'}
    </Fab>
  );
}

SaveProfileButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
