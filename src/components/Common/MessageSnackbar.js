import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarContent, Typography } from '@material-ui/core';
import * as PropTypes from 'prop-types';

const useStyles = variant => makeStyles(theme => ({
  closeBtn: {
    padding: theme.spacing(0.5),
  },
  container: {
    backgroundColor: variant === 'error' ? theme.palette.error.main : theme.palette.primary.main,
  },
}));

function MessageSnackbar(props) {
  const { message, variant, onDismiss } = props;
  const classes = useStyles(variant)();
  const [open, setOpen] = React.useState(true);

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    if (onDismiss) {
      onDismiss();
    }
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <SnackbarContent
        className={classes.container}
        message={<Typography variant="body1">{message}</Typography>}
        action={[
          <IconButton
            key="close"
            color="inherit"
            className={classes.closeBtn}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}

export default MessageSnackbar;

MessageSnackbar.defaultProps = {
  onDismiss: null,
  variant: '',
};

MessageSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
  onDismiss: PropTypes.func,
  variant: PropTypes.string,
};
