import {Grid} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import React from "react";
import TextField from "@material-ui/core/TextField";
import * as PropTypes from "prop-types";
import Select from "react-select";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(1)
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export function EditablePaymentMethod(props) {
    const classes = useStyles();
    let {currencyCode, data, availableCurrencies, onCurrencyCodeChange, onDataChange, onDelete, hasError} = props;
    let selectableCurrencies = availableCurrencies.map((currencyCode) => { return { value: currencyCode, label: currencyCode } });
    return (
        <Grid container className={classes.root}>
            <Grid item xs={3}>
                <Select
                    required
                    value={currencyCode ? {value: currencyCode, label: currencyCode} : null}
                    onChange={(newCurrencyCode) => {onCurrencyCodeChange(newCurrencyCode.value)}}
                    options={selectableCurrencies}
                    placeholder={'Currency'}
                    isSearchable={true}
                />
            </Grid>
            <Grid item xs={8}>
                <TextField
                    required
                    error={hasError}
                    value={data ? data : ''}
                    label='Payment Address'
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => {onDataChange(e.target.value)}}
                />
            </Grid>
            <Grid item xs={1}>
                <IconButton aria-label="Delete" className={classes.margin} onClick={onDelete}>
                    <DeleteIcon/>
                </IconButton>
            </Grid>
        </Grid>
    );
}

EditablePaymentMethod.propTypes = {
    currencyCode: PropTypes.string,
    data: PropTypes.string,
    availableCurrencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    onCurrencyCodeChange: PropTypes.func.isRequired,
    onDataChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired
};