import React from 'react';
import classify from 'src/classify';
import {oneOf, object, shape, string} from 'prop-types';

import {Price} from 'src/components/Price';
import {MetaData} from "src/components/RkStore/PriceWrapper";

import defaultClasses from './specialPrice.css';

const SpecialPrice = ({priceData, priceConfig, viewMode, classes}) => {

    const rootClassName = [
        classes.root,
        classes[`mode__${viewMode}`]
    ];

    return (
        <div className={rootClassName.join(' ')}>
            {
                viewMode == 'category_page' &&
                <React.Fragment>
                    <span className={classes.specialPriceLabel}>Special Price</span>
                    <span><Price value={priceData.special_price} {...priceConfig}/></span>
                </React.Fragment>
            }
            {
                viewMode == 'product_page' &&
                <React.Fragment>
                    {!!priceData.regular_price &&
                    <div className={classes.oldPrice}>
                        <span className={classes.oldPriceLabel}>Regular Price:</span>
                        <span><Price value={priceData.regular_price} {...priceConfig}/></span>
                    </div>
                    }
                    <div className={classes.specialPrice}>
                        <span className={classes.specialPriceLabel}>Special Price:</span>
                        <span><Price value={priceData.special_price} {...priceConfig}/></span>
                    </div>
                    {!!priceData.save_amount && !!priceData.save_amount &&
                    <div className={classes.saveInfo}>
                        {`You Save: `}<Price value={priceData.save_amount} {...priceConfig}/>{` (${priceData.save_percent}%)`}
                    </div>
                    }
                    <MetaData price={priceData.special_price} currencyCode={priceConfig.currencyCode}/>
                </React.Fragment>
            }
        </div>
    );
}

SpecialPrice.propsType = {
    classes: shape({
        root: string,
        oldPrice: string,
        oldPriceLabel: string,
        specialPrice: string,
        specialPricelabel: string,
        saveInfo: string
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