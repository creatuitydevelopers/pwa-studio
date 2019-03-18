import React, { Component } from 'react';
import { func, object, shape, string, oneOf, number } from 'prop-types';

import classify from 'src/classify';
import defaultClasses from './deliveryMethodLabel.css';
import { Title } from 'src/components/RkStore';
import {getStoreByNumber} from 'src/models/Store';
import {isStsMethod} from 'src/models/DeliveryMethods';

class DeliveryMethodLabel extends Component {
    static propTypes = {
        classes: shape({
            root: string
        }),
        methodCode: string,
        storeNumber: string
    };


    render() {
        const {
            classes,
            methodCode,
            storeNumber,
            allStores
        } = this.props;

        const store = !!storeNumber ? getStoreByNumber(allStores, storeNumber) : null;

        return (
            <div className={classes.root}>
                {isStsMethod(methodCode) && <span><span>Ship to Store - </span><Title store={store} tag={`span`}/></span> }
                {!isStsMethod(methodCode) && <span><span>Ship to Home</span></span> }
            </div>
        );
    }
}

export default classify(defaultClasses)(DeliveryMethodLabel);
