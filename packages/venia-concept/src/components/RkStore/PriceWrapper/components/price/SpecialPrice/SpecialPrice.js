import React from 'react';
import classify from 'src/classify';
import {oneOf, object, shape, string} from 'prop-types';

import { Price } from 'src/components/Price';

import defaultClasses from './specialPrice.css';

const SpecialPrice = ({priceData, priceConfig, viewMode, classes}) => {

    return (
        <div className={classes.root}>
            {
                viewMode == 'category_page' &&
                <React.Fragment>
                    <span>Special Price</span>
                    <span><Price value={priceData.special_price} {...priceConfig}/></span>
                </React.Fragment>
            }
            {
                viewMode == 'product_page' &&
                <React.Fragment>
                    {!!priceData.regular_price &&
                        <div className={classes.oldPrice}>
                            <span>Regular Price</span>
                            <span><Price value={priceData.regular_price} {...priceConfig}/></span>
                        </div>
                    }
                    <div className={classes.specialPrice}>
                        <span>Special Price</span>
                        <span><Price value={priceData.special_price} {...priceConfig}/></span>
                    </div>
                    {!!priceData.costSave && !!priceData.savePercent &&
                        <div className={classes.saveInfo}>
                            <span>{`You Save ${priceData.costSave} (${priceData.savePercent})`}</span>
                        </div>
                    }
                </React.Fragment>
            }
        </div>
    );
}

SpecialPrice.propsType = {
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

export default classify(defaultClasses)(SpecialPrice);