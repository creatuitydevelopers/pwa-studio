import React from 'react';
import classify from 'src/classify';
import { getStoreByNumber } from 'src/actions/store';
import Button from 'src/components/Button';
import defaultClasses from './shippingInformation.css';
import groupBy from 'lodash/groupBy';
import uniqBy from 'lodash/uniqBy';
import chain from 'lodash/chain';
import mapKeys from 'lodash/mapKeys';
import toPairs from 'lodash/toPairs'
import mapValues from 'lodash/mapValues';
import { loadingIndicator } from 'src/components/LoadingIndicator';
import DeliveryMethods from './DeliveryMethods';

class ShippingInformation extends React.Component {

    getStoreDetailsByNumber = async (storeNumber) => {
        return getStoreByNumber(storeNumber);
    }

    get content() {
        const { cart, availableShippingMethods } = this.props;
        const { details: { items } } = cart;
        const data = toPairs(groupBy(items, item => item.extension_attributes.delivery_method));

        return (
            data.map((el,idx) => {
                const [storeCode, items] = el;

                return <DeliveryMethods 
                            key={idx}
                            availableShippingMethods={availableShippingMethods} 
                            storeCode={storeCode} 
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
                    <h2 className={classes.heading}>Shipping Information</h2>
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


