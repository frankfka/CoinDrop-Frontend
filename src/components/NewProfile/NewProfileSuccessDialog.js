import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, makeStyles,
  TextField,
} from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import IconButton from '@material-ui/core/IconButton';
import { FileCopy } from '@material-ui/icons';
import MessageSnackbar from '../Common/MessageSnackbar';

const useStyles = makeStyles(theme => ({
  textLinkSection: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  linkTextBox: {
    width: '100%',
    marginRight: theme.spacing(1),
  },
}));

export default function NewProfileSuccessDialog(props) {
  const classes = useStyles();
  const { profileLink, isOpen, handleClose } = props;
  const [showCopiedPrompt, setShowCopiedPrompt] = useState(false);

  const onLinkCopied = () => {
    setShowCopiedPrompt(true);
  };
  const onCopiedPromptClose = () => {
    setShowCopiedPrompt(false);
  };


  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
    >
      {
        showCopiedPrompt
        && (
          <MessageSnackbar
            message="Link copied."
            onDismiss={onCopiedPromptClose}
          />
        )
      }

      <DialogTitle>
        Success!
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your payment profile was created successfully! You can now share your unique link with
           others to be paid cryptocurrency easily.
        </DialogContentText>
        <div className={classes.textLinkSection}>
          <TextField
            className={classes.linkTextBox}
            label="Your Profile Link"
            defaultValue={profileLink}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
          <CopyToClipboard
            text={profileLink}
            onCopy={onLinkCopied}
          >
            <IconButton aria-label="Copy address">
              <FileCopy />
            </IconButton>
          </CopyToClipboard>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={handleClose}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

NewProfileSuccessDialog.propTypes = {
  profileLink: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
