import {Dialog, DialogContent, DialogTitle, DialogContentText,
        DialogActions, Button, TextField} from "@material-ui/core";
import React from "react";
import * as PropTypes from "prop-types";
import PaymentMethodQRCode from "./PaymentMethodQRCode";

export default function PaymentMethodDetailDialog(props) {
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
                <DialogContentText>
                    Or use the following public address:
                </DialogContentText>
                <TextField
                    label={`${currencyCode} Public Address`}
                    defaultValue={data}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
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
