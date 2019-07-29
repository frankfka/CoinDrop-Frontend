import Select from 'react-select';
import React from 'react';
import * as PropTypes from 'prop-types';

// Styles for the select component
const selectStyles = muiTheme => ({
  // Main container
  container: provided => ({
    ...provided,
    height: '100%',
  }),
  // Dropdown control
  control: provided => ({
    ...provided,
    height: '100%',
  }),
  // Styling for each option
  option: (provided, state) => ({
    ...provided,
    color: muiTheme.palette.text.primary,
    backgroundColor:
            state.isSelected
              ? muiTheme.palette.grey['300']
              : state.isFocused
                ? muiTheme.palette.grey['200']
                : muiTheme.palette.background.default,
    padding: muiTheme.spacing(2),
    fontFamily: muiTheme.typography.fontFamily,
  }),
  // Typing input for search
  input: provided => ({
    ...provided,
    fontFamily: muiTheme.typography.fontFamily,
  }),
  // Placeholder text
  placeholder: provided => ({
    ...provided,
    fontFamily: muiTheme.typography.fontFamily,
  }),
  // Value displayed when picked
  singleValue: provided => ({
    ...provided,
    fontFamily: muiTheme.typography.fontFamily,
  }),
  // Displayed at search when no options are found
  noOptionsMessage: provided => ({
    ...provided,
    fontFamily: muiTheme.typography.fontFamily,
  }),
  loadingMessage: provided => ({
    ...provided,
    fontFamily: muiTheme.typography.fontFamily,
  }),
});
// Theming for react select
const selectTheme = muiTheme => (theme => ({
  ...theme,
  borderRadius: muiTheme.shape.borderRadius,
  fontFamily: muiTheme.typography.fontFamily,
  colors: {
    ...theme.colors,
    primary: muiTheme.palette.primary.dark,
    primary75: muiTheme.palette.primary.main,
    primary50: muiTheme.palette.primary.light,
    primary25: muiTheme.palette.grey['200'],
  },
}));

function EditablePaymentMethodSelect(props) {
  const {
    muiTheme, selectedValue, onCurrencyCodeChange, selectableCurrencies, loading,
  } = props;

  return (
    <Select
      isLoading={loading}
      theme={selectTheme(muiTheme)}
      styles={selectStyles(muiTheme)}
      value={selectedValue}
      onChange={(newCurrencyCode) => {
        onCurrencyCodeChange(newCurrencyCode.value);
      }}
      options={selectableCurrencies}
      placeholder="Currency"
      isSearchable
    />
  );
}

EditablePaymentMethodSelect.defaultProps = {
  selectedValue: null,
  loading: false,
};

EditablePaymentMethodSelect.propTypes = {
  muiTheme: PropTypes.instanceOf(Object).isRequired,
  loading: PropTypes.bool,
  selectedValue: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  onCurrencyCodeChange: PropTypes.func.isRequired,
  selectableCurrencies: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

export default EditablePaymentMethodSelect;
