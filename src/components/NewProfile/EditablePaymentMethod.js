import { Grid, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import * as PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditablePaymentMethodSelect from './EditablePaymentMethodSelect';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  deleteIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function EditablePaymentMethod(props) {
  const classes = useStyles();
  const muiTheme = useTheme();
  const {
    currencyCode, data, availableCurrencies, onCurrencyCodeChange,
    onDataChange, onDelete, hasError, loading,
  } = props;
  const selectableCurrencies = availableCurrencies.map(code => ({ value: code, label: code }));
  return (
    <Grid
      container
      className={classes.root}
      spacing={2}
    >
      <Grid item xs={4} sm={3}>
        <EditablePaymentMethodSelect
          loading={loading}
          muiTheme={muiTheme}
          onCurrencyCodeChange={onCurrencyCodeChange}
          selectedValue={currencyCode ? { value: currencyCode, label: currencyCode } : null}
          selectableCurrencies={selectableCurrencies}
        />
      </Grid>
      <Grid item xs={6} sm={8}>
        <TextField
          required
          error={hasError}
          value={data || ''}
          label="Address"
          className={classes.textField}
          variant="outlined"
          onChange={(e) => {
            onDataChange(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={2} sm={1} className={classes.deleteIcon}>
        <IconButton aria-label="Delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

EditablePaymentMethod.defaultProps = {
  currencyCode: '',
  data: '',
  loading: false,
};

EditablePaymentMethod.propTypes = {
  currencyCode: PropTypes.string,
  data: PropTypes.string,
  loading: PropTypes.bool,
  availableCurrencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onCurrencyCodeChange: PropTypes.func.isRequired,
  onDataChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
};
