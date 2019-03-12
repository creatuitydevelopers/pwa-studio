import React, { Component } from 'react';
import { array, bool, func, shape, string } from 'prop-types';

import Label from 'src/components/Checkout/label';
import Select from 'src/components/Select';

import classify from 'src/classify';
import defaultClasses from './shippingSelect.css';

class ShippingSelect extends Component {
    static propTypes = {
        availableShippingMethods: array.isRequired,
        classes: shape({
            shippingMethod: string
        }),
        shippingMethod: string
    };

    static defaultProps = {
        availableShippingMethods: [{}]
    };

    render() {
        const {
            availableShippingMethods,
            classes,
            shippingMethod,
        } = this.props;

        let initialValue;
        let selectableShippingMethods;

        if (availableShippingMethods.length) {
            selectableShippingMethods = availableShippingMethods.map(
                ({ carrier_code, carrier_title, method_title, price }) => ({
                    label: `${carrier_title} (${method_title}) - ${price}`,
                    value: carrier_code
                })
            );
            initialValue =
                shippingMethod || availableShippingMethods[0].carrier_code;
        } else {
            selectableShippingMethods = [];
            initialValue = '';
        }

        return (
            <div className={classes.shippingMethod}>
                <Label htmlFor={`shippingMethod`}>
                    Shipping Method:
                </Label>
                <Select
                    field="shippingMethod"
                    initialValue={initialValue}
                    items={selectableShippingMethods}
                />
            </div>
        );
    }
}

export default classify(defaultClasses)(ShippingSelect);
