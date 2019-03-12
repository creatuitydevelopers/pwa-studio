import React from 'react';
import { string, object, array } from 'prop-types';

import StoreDetails from './StoreDetails';
import ShippingSelect from './ShippingSelect';

import {getName, isToShopMethod} from 'src/models/DeliveryMethods';


import classify from 'src/classify';
import defaultClasses from './deliveryMethods.css';
import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs';

class DeliveryMethods extends React.Component {

    get shipToStoreContent() {

        const { currencyCode, items } = this.props;
        const dataGroupedByStoreNumber = toPairs(
            groupBy(items, item => item.extension_attributes.store_number)
        );

        return (
            <React.Fragment>
                {dataGroupedByStoreNumber.map((store, idx) => {
                    const [storeNumber, items] = store;
                    return (<StoreDetails
                        key={idx}
                        currencyCode={currencyCode}
                        storeNumber={storeNumber}
                        items={items}
                    />);
                })}
            </React.Fragment>
        );
    }

    get shipToHomeContent() {
        const { availableShippingMethods, shippingMethod, classes } = this.props;

        return (
            <React.Fragment>
                {!!availableShippingMethods.length
                    ? <ShippingSelect
                        availableShippingMethods={availableShippingMethods}
                        shippingMethod={shippingMethod}
                    />
                : <p className={classes.noMethods}>Sorry, no quotes are available for this order right now.</p>}
            </React.Fragment>
        );
    }

    get content() {
        const { methodCode } = this.props;
        return (
            <React.Fragment>
                {!!isToShopMethod(methodCode) && this.shipToStoreContent}
                {!isToShopMethod(methodCode) && this.shipToHomeContent}
            </React.Fragment>
        );
    }

    render() {
        const {classes, methodCode } = this.props;

        return (
            <div>
                <h3 className={classes.name}>
                    <strong>{getName(methodCode)}</strong>
                </h3>
                {this.content}
            </div>
        );
    }
}

DeliveryMethods.propTypes = {
    availableShippingMethods: array,
    storeCode: string,
    currencyCode: string,
    items: array,
    classes: object
};

export default classify(defaultClasses)(DeliveryMethods);
