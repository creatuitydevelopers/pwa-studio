import React from 'react';
import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs'
import StoreDetails from './StoreDetails';
import classify from 'src/classify';
import defaultClasses from './deliveryMethods.css';

class DeliveryMethods extends React.Component {

    getCarrierTitleByCode = (code) => {
        const { availableShippingMethods } = this.props;
        const carrier = availableShippingMethods.find((el) => {
            return el.carrier_code == code;
        })
        return carrier.carrier_title
    }

    render() {
        const { storeCode, currencyCode, items, classes } = this.props;
        const dataGroupedByStoreNumber = toPairs(groupBy(items, item => item.extension_attributes.store_number));

        return (
            <div>
                <h3 className={classes.name}><strong>{this.getCarrierTitleByCode(storeCode)}</strong></h3>
                {
                    dataGroupedByStoreNumber.map((store, idx) => {
                        const [storeNumber, items] = store;
                        return <StoreDetails 
                                    key={idx} 
                                    currencyCode={currencyCode}
                                    storeNumber={storeNumber} 
                                    items={items} 
                                />
                    })
                }
            </div>
            
        )
    }

}

export default classify(defaultClasses)(DeliveryMethods);