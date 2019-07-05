import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {SnackbarContent, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    closeBtn: {
        padding: theme.spacing(0.5),
    },
    error: {
        backgroundColor: theme.palette.error.main
    }
}));

function ErrorPrompt(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const {message, onDismiss} = props;

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        if (onDismiss) {
            onDismiss()
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
                className={classes.error}
                message={<Typography variant="body1">{message}</Typography>}
                action={[
                    <IconButton
                        key="close"
                        color="inherit"
                        className={classes.closeBtn}
                        onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    );
}

export default ErrorPrompt