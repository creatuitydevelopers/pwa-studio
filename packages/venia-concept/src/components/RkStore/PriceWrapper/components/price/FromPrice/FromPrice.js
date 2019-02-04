import React from 'react';
import classify from 'src/classify';
import {oneOf, object, shape, string} from 'prop-types';

import {Price} from 'src/components/Price';

import defaultClasses from './fromPrice.css';

const FromPrice = ({priceData, priceConfig, classes}) => {

    return (
        <div className={classes.root}>
            <span className={classes.label}>From</span>
            <span className={classes.price}>
                <Price value={priceData.regular_price} {...priceConfig}/>
            </span>
        </div>
    );
}

FromPrice.propsType = {
    classes: shape({
        root: string,
        label: string,
        price: string,
    }),
    priceConfig: shape({
        currencyCode: string.isRequired,
        partsClasses: object,
        locale: string.isRequired,
    }),
    priceData: object.isRequired,
    viewMode: oneOf(['product_page', 'category_page'])
};

export default classify(defaultClasses)(FromPrice);