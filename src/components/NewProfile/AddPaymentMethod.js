import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(2),
  },
}));

export default function AddPaymentMethod(props) {
  const classes = useStyles();
  const { onClick, isEnabled } = props;
  return (
    <Button
      variant="contained"
      size="small"
      color="secondary"
      aria-label="Add"
      className={classes.margin}
      onClick={onClick}
      disabled={!isEnabled}
    >
      <AddIcon className={classes.extendedIcon} />
            Add Payment Method
    </Button>
  );
}

AddPaymentMethod.propTypes = {
  onClick: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool.isRequired,
};
