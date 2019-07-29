import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import NewProfileForm from './NewProfileForm';

const useStyles = makeStyles(theme => ({
  newProfileForm: {
    marginTop: theme.spacing(2),
  },
}));

export default function NewProfilePage() {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h3" component="h1">New Profile</Typography>
      <Typography variant="subtitle1" component="h5">
        Create a unique payment profile for others to pay you in cryptocurrency.
      </Typography>
      <div className={classes.newProfileForm}>
        <NewProfileForm />
      </div>
    </div>
  );
}
