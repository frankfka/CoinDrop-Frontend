import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {EditablePaymentMethod} from "./EditablePaymentMethod";
import {AddPaymentMethod} from "./AddPaymentMethod";

class NewProfileForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            availableCurrencies: props.allCurrencies, // All supported currencies minus the ones already added
            formData: {
                paymentMethods: []
            }
        };
        this.onPaymentMethodDataChange = this.onPaymentMethodDataChange.bind(this);
        this.onAddPaymentMethod = this.onAddPaymentMethod.bind(this);
        this.onPaymentMethodCurrencyCodeChange = this.onPaymentMethodCurrencyCodeChange.bind(this);
        this.onPaymentMethodDelete = this.onPaymentMethodDelete.bind(this);
    }

    render() {
        let { availableCurrencies, formData } = this.state;
        let currentPaymentMethods = formData.paymentMethods;
        let self = this;

        return (
            <div>
                {currentPaymentMethods.map((paymentMethod, index) => {
                    return (
                        <EditablePaymentMethod
                            key={index}
                            currencyCode={paymentMethod.currencyCode}
                            data={paymentMethod.data}
                            onDataChange={self.onPaymentMethodDataChange(index)}
                            hasError={paymentMethod.hasError}
                            availableCurrencies={availableCurrencies}
                            onCurrencyCodeChange={self.onPaymentMethodCurrencyCodeChange(index)}
                            onDelete={self.onPaymentMethodDelete(index)}/>
                        )
                })}
                <AddPaymentMethod onClick={this.onAddPaymentMethod} isEnabled={currentPaymentMethods.length < 10}/>
            </div>
        )
    }

    onPaymentMethodDataChange(index) {
        return (data) => {
            console.log(`${index}: ${data}`)
        }
    }

    onAddPaymentMethod() {
        let paymentMethods = this.state.formData.paymentMethods;
        paymentMethods.push({});
        this.setState({
            formData: {
                paymentMethods: paymentMethods
            }
        })
    }

    onPaymentMethodCurrencyCodeChange(index) {
        // TODO: Finish these!
        return (currencyCode) => {
            console.log(`${index}: ${currencyCode}`)
        }
    }

    onPaymentMethodDelete(index) {
        return () => {
            console.log(`${index}: Delete`)
        }
    }

}

NewProfileForm.propTypes = {
    allCurrencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default NewProfileForm;