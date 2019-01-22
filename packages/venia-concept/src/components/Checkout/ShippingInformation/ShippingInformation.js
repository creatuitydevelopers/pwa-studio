import React from 'react';
import classify from 'src/classify';
import { getStoreByNumber } from 'src/actions/store';
import Button from 'src/components/Button';
import defaultClasses from './shippingInformation.css';
import DeliveryMethods from './DeliveryMethods';
import { loadingIndicator } from 'src/components/LoadingIndicator';

import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs';

class ShippingInformation extends React.Component {

    getStoreDetailsByNumber = async (storeNumber) => {
        return getStoreByNumber(storeNumber);
    }

    get content() {
        const { cart, availableShippingMethods } = this.props;
        const { details: { items, currency: { quote_currency_code } } } = cart;
        const data = toPairs(groupBy(items, item => item.extension_attributes.delivery_method));

        return (
            data.map((el, idx) => {
                const [storeCode, items] = el;
                return <DeliveryMethods
                    key={idx}
                    availableShippingMethods={availableShippingMethods}
                    storeCode={storeCode}
                    currencyCode={quote_currency_code}
                    items={items}
                />
            })
        )
    }

    render() {
        const { classes, availableShippingMethods, cancel } = this.props;
        if (!availableShippingMethods.length) {
            return loadingIndicator;
        }
        const { content } = this;

        return (
            <div className={classes.root}>
                <div className={classes.body}>
                    <div>
                        {content}
                    </div>
                </div>
                <div className={classes.footer}>
                    <Button onClick={cancel}>Done</Button>
                </div>
            </div>
        )
    }
}

export default classify(defaultClasses)(ShippingInformation);


