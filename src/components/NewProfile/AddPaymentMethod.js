import {makeStyles} from '@material-ui/core/styles';
import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import * as PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(2),
    },
}));

export function AddPaymentMethod(props) {
    const classes = useStyles();
    let {onClick, isEnabled} = props;
    return (
        <Fab
            variant="extended"
            size="large"
            color="primary"
            aria-label="Add"
            className={classes.margin}
            onClick={onClick}
            disabled={!isEnabled}
        >
            <AddIcon className={classes.extendedIcon}/>
            Add Payment Method
        </Fab>
    );
}

AddPaymentMethod.propTypes = {
    onClick: PropTypes.func.isRequired,
    isEnabled: PropTypes.bool.isRequired
};