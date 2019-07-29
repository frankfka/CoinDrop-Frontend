import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import * as PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

export const PROFILE_NAME_KEY = 'profileName';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    width: '100%',
  },
}));

export function NewProfileFormProfileInfo(props) {
  const classes = useStyles();
  const { profileInfo, onProfileInfoChange } = props;

  return (
    <Grid
      container
      className={classes.root}
      spacing={2}
    >
      <Grid item xs={12}>
        <TextField
          value={profileInfo[PROFILE_NAME_KEY] ? profileInfo[PROFILE_NAME_KEY] : ''}
          label="Profile Name"
          helperText="Optional"
          className={classes.textField}
          variant="outlined"
          onChange={(e) => {
            onProfileInfoChange(PROFILE_NAME_KEY, e.target.value);
          }}
        />
      </Grid>
    </Grid>
  );
}

NewProfileFormProfileInfo.propTypes = {
  profileInfo: PropTypes.instanceOf(Object).isRequired,
  onProfileInfoChange: PropTypes.func.isRequired,
};
