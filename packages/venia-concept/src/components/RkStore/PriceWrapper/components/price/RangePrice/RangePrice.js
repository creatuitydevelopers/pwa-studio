import React from 'react';
import classify from 'src/classify';
import {oneOf, object, shape, string} from 'prop-types';

import {Price} from 'src/components/Price';
import { MetaData } from "src/components/RkStore/PriceWrapper";

import defaultClasses from './rangePrice.css';

const RangePrice = ({priceData, priceConfig, viewMode, classes}) => {

    const rootClassName = [
        classes.root,
        classes[`mode__${viewMode}`]
    ];

    return (
        <div className={rootClassName.join(' ')}>
            {
                viewMode == 'category_page' &&
                <React.Fragment>
                    <span className={classes.minPrice}>
                        <Price value={priceData.min_price} {...priceConfig}/>
                    </span>
                    <span className={classes.plus}>+</span>
                </React.Fragment>
            }
            {
                viewMode == 'product_page' &&
                <React.Fragment>
                    <span className={classes.minPrice}>
                        <Price value={priceData.min_price} {...priceConfig}/>
                    </span>
                    <span className={classes.separator}>-</span>
                    <span className={classes.maxPrice}>
                        <Price value={priceData.max_price} {...priceConfig}/>
                    </span>
                    <MetaData price={priceData.min_price} currencyCode={priceConfig.currencyCode}/>
                </React.Fragment>
            }
        </div>
    );
}

RangePrice.propsType = {
    classes: shape({
        root: string,
        minPrice: string,
        maxPrice: string,
        separator: string,
        plus: string
    }),
    priceConfig: shape({
        currencyCode: string.isRequired,
        partsClasses: object,
        locale: string.isRequired,
    }),
    priceData: object.isRequired,
    viewMode: oneOf(['product_page', 'category_page']).isRequired
};

export default classify(defaultClasses)(RangePrice);