import React from 'react';
import classify from 'src/classify';
import {oneOf, object, shape, string} from 'prop-types';

import { Price } from 'src/components/Price';

import defaultClasses from './regularPrice.css';

const RegularPrice = ({priceData, priceConfig, classes}) => {

    return (
        <div className={classes.root}>
            <span><Price value={priceData.final_price} {...priceConfig}/></span>
        </div>
    );
};

RegularPrice.propsType = {
    classes: shape({

    }),
    priceConfig: shape({
        currencyCode: string.isRequired,
        partsClasses: object,
        locale: string.isRequired,
    }),
    priceData: object.isRequired,
    viewMode: oneOf(['product_page', 'category_page']).isRequired
};

export default classify(defaultClasses)(RegularPrice);