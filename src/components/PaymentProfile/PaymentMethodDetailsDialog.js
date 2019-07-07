import {
    Dialog, DialogContent, DialogTitle, DialogContentText,
    DialogActions, Button, TextField, makeStyles
} from "@material-ui/core";
import React from "react";
import * as PropTypes from "prop-types";
import PaymentMethodQRCode from "./PaymentMethodQRCode";
import {FileCopy} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {CopyToClipboard} from "react-copy-to-clipboard";

const useStyles = makeStyles(theme => ({
    topMargin: {
        marginTop: theme.spacing(2)
    },
    textAddressSection: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    textAddressTextBox: {
        marginRight: theme.spacing(1)
    }
}));

export default function PaymentMethodDetailDialog(props) {
    let classes = useStyles();
    let { paymentMethod, isOpen, handleClose } = props;
    let currencyCode = paymentMethod ? paymentMethod.currencyCode : null;
    let data = paymentMethod ? paymentMethod.data : null;

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            maxWidth='lg'
        >
            <DialogTitle>Pay with {currencyCode}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Scan the QR code below:
                </DialogContentText>
                <PaymentMethodQRCode data={data}/>
                <DialogContentText className={classes.topMargin}>
                    Or use the following public address:
                </DialogContentText>
                <div className={classes.textAddressSection}>
                    <TextField
                        className={classes.textAddressTextBox}
                        label={`${currencyCode} Public Address`}
                        defaultValue={data}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                    <CopyToClipboard text={data}>
                        <IconButton aria-label="Copy address">
                            <FileCopy/>
                        </IconButton>
                    </CopyToClipboard>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Dismiss</Button>
            </DialogActions>
        </Dialog>
    )
}

PaymentMethodDetailDialog.propTypes = {
    paymentMethod: PropTypes.shape({
        currencyCode: PropTypes.string.isRequired,
        data: PropTypes.string.isRequired
    }),
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};
