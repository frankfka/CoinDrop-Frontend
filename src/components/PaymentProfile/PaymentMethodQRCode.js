import React from "react";
import * as PropTypes from "prop-types";
import * as QRCode from "qrcode.react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    responsive: {
        width: '100%',
        height: 'auto'
    }
}));

export default function PaymentMethodQRCode(props) {
    const classes = useStyles();
    return (
        <QRCode value={props.data} size={256} renderAs='svg' className={classes.responsive}/>
    )
}

PaymentMethodQRCode.propTypes = {
    data: PropTypes.string.isRequired
};