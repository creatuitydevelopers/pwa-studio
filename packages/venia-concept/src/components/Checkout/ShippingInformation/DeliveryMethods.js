import React from 'react';
import { string, object, array } from 'prop-types';
import StoreDetails from './StoreDetails';

import {getName, isToShopMethod} from 'src/models/DeliveryMethods';


import classify from 'src/classify';
import defaultClasses from './deliveryMethods.css';
import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs';

class DeliveryMethods extends React.Component {


    render() {
        const { availableShippingMethods, currencyCode, items, classes, methodCode } = this.props;
        const dataGroupedByStoreNumber = toPairs(
            groupBy(items, item => item.extension_attributes.store_number)
        );

        return (
            <div>
                <h3 className={classes.name}>
                    <strong>{getName(methodCode)}</strong>
                </h3>
                {!!isToShopMethod(methodCode) && dataGroupedByStoreNumber.map((store, idx) => {
                    const [storeNumber, items] = store;
                    return (
                        <StoreDetails
                            key={idx}
                            currencyCode={currencyCode}
                            storeNumber={storeNumber}
                            items={items}
                        />
                    );
                })}

                {!isToShopMethod(methodCode)
                    && !availableShippingMethods.length
                    && <p className={classes.noMethods}>Sorry, no quotes are available for this order right now.</p>}
                {!isToShopMethod(methodCode) && !!availableShippingMethods.length && <p>Here wile be select</p>}

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
