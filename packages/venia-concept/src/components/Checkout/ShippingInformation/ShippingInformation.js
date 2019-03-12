import React from 'react';
import classify from 'src/classify';
import {bool, string, func, object, array} from 'prop-types';
import {getStoreByNumber} from 'src/actions/store';

import {Form} from 'informed';
import Button from 'src/components/Button';
import ShippingForm from 'src/components/Checkout/shippingForm';
import DeliveryMethods from './DeliveryMethods';
import defaultClasses from './shippingInformation.css';

import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs';

class ShippingInformation extends React.Component {

    getStoreDetailsByNumber = async storeNumber => {
        return getStoreByNumber(storeNumber);
    };

    get content() {
        const {cart, submitShippingMethod, shippingMethod, availableShippingMethods} = this.props;
        const {
            details: {
                items,
                currency: {quote_currency_code}
            }
        } = cart;

        const data = toPairs(
            groupBy(items, item => item.extension_attributes.delivery_method)
        );

        return data.map((el, idx) => {
            const [methodCode, items] = el;
            return (
                <DeliveryMethods
                    key={idx}
                    availableShippingMethods={availableShippingMethods}
                    methodCode={methodCode}
                    currencyCode={quote_currency_code}
                    items={items}
                    shippingMethod={shippingMethod}
                />
            );
        });
    }

    render() {

        const {
            availableShippingMethods,
            cancel,
            classes,
            isOrderOnlyToStores,
            submitting,
        } = this.props;

        const {content} = this;

        return (
            <Form
                className={classes.root}
                onSubmit={this.submit}
            >
                <div className={classes.body}>
                    <h2 className={classes.heading}>Shipping Information</h2>
                    {content}
                </div>
                <div className={classes.footer}>
                    <Button onClick={cancel}>{isOrderOnlyToStores ? `Back` : `Cancel`}</Button>
                    {!isOrderOnlyToStores && !!availableShippingMethods.length && <Button
                            className={classes.button}
                            priority="high"
                            type="submit"
                            disabled={submitting}>Use Method</Button>}
                </div>
            </Form>
        );
    }

    submit = ({ shippingMethod }) => {

        const selectedShippingMethod = this.props.availableShippingMethods.find(
            ({ carrier_code }) => carrier_code === shippingMethod
        );

        if (!selectedShippingMethod) {
            console.warn(
                `Could not find the selected shipping method ${selectedShippingMethod} in the list of available shipping methods.`
            );
            this.props.cancel();
            return;
        }

        this.props.submitShippingMethod({ shippingMethod: selectedShippingMethod });
    };
}

ShippingInformation.propTypes = {
    cancel: func,
    cart: object,
    availableShippingMethods: array,
    shippingMethod: string,
    submitShippingMethod: func.isRequired,
    submitting: bool,
    isOrderOnlyToStores: bool
};

export default classify(defaultClasses)(ShippingInformation);
