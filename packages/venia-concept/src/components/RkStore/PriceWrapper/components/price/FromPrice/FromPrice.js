import React from 'react';
import classify from 'src/classify';
import {oneOf, object, shape, string} from 'prop-types';

import {Price} from 'src/components/Price';
import { MetaData } from "src/components/RkStore/PriceWrapper";

import defaultClasses from './fromPrice.css';

const FromPrice = ({priceData, priceConfig, viewMode, classes}) => {
    const rootClassName = [
        classes.root,
        classes[`mode__${viewMode}`]
    ];

    return (
        <div className={rootClassName.join(' ')}>
            <span className={classes.label}>From</span>
            <span className={classes.price}>
                <Price value={priceData.regular_price} {...priceConfig}/>
                {viewMode == 'product_page' && <MetaData price={priceData.regular_price} currencyCode={priceConfig.currencyCode}/>}
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