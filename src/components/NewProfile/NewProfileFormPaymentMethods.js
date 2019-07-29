import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as PropTypes from 'prop-types';
import EditablePaymentMethod from './EditablePaymentMethod';
import AddPaymentMethod from './AddPaymentMethod';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    backgroundColor: theme.palette.grey['100'],
    borderRadius: theme.shape.borderRadius,
  },
  helperText: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  addPaymentButton: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
}));

function NewProfileFormPaymentMethods(props) {
  const classes = useStyles();
  const {
    currentPaymentMethods, allCurrencyCodes, enableAddButton, showHelperText, loading,
  } = props;
  const {
    onDataChange, onCurrencyCodeChange, onDelete, onAdd,
  } = props;

  return (
    <Container className={classes.container}>
      {
                showHelperText ? (
                  <Typography variant="subtitle1" className={classes.helperText}>
                        Add at least one payment method.
                  </Typography>
                ) : <div />
            }
      {currentPaymentMethods.map((paymentMethod, index) => (
        <EditablePaymentMethod
          loading={loading}
          key={paymentMethod}
          currencyCode={paymentMethod.currencyCode}
          data={paymentMethod.data}
          onDataChange={onDataChange(index)}
          hasError={paymentMethod.hasError}
          availableCurrencies={allCurrencyCodes}
          onCurrencyCodeChange={onCurrencyCodeChange(index)}
          onDelete={onDelete(index)}
        />
      ))}
      <div className={classes.addPaymentButton}>
        <AddPaymentMethod
          onClick={onAdd}
          isEnabled={enableAddButton}
        />
      </div>
    </Container>
  );
}

NewProfileFormPaymentMethods.defaultProps = {
  loading: false,
};

NewProfileFormPaymentMethods.propTypes = {
  currentPaymentMethods: PropTypes.arrayOf(PropTypes.shape({
    currencyCode: PropTypes.string,
    data: PropTypes.string,
    hasError: PropTypes.bool,
  })).isRequired,
  loading: PropTypes.bool,
  allCurrencyCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  enableAddButton: PropTypes.bool.isRequired,
  showHelperText: PropTypes.bool.isRequired,
  onDataChange: PropTypes.func.isRequired,
  onCurrencyCodeChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default NewProfileFormPaymentMethods;
