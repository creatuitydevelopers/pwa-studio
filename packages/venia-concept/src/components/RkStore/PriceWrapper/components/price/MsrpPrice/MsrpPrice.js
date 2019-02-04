import React from 'react';
import classify from 'src/classify';
import { oneOf, object, shape, string } from 'prop-types';
import Info from 'react-feather/dist/icons/info';
import Icon from 'src/components/Icon';
import { Price } from 'src/components/Price';

import defaultClasses from './msrpPrices.css'

const MsrpPrice = ({priceData, priceConfig, viewMode, classes}) => {
    console.log(priceData, priceConfig, viewMode);
    return (
        <div className={classes.root}>
            {viewMode ==  'product_page' && <div className={classes.msrpPrice}><Price value={priceData.msrp_price} {...priceConfig}/></div>}
            <p>{`See in cart.`} <Icon src={Info}/></p>
        </div>
    );
};

MsrpPrice.propsType = {
    priceConfig: shape({
        currencyCode: string.isRequired,
        partsClasses: object,
        locale: string.isRequired,
    }),
    classes: shape({
        root: string,
        msrpPrice: string
    }),
    viewMode: oneOf(['product_page', 'category_page'])
};


export default classify(defaultClasses)(MsrpPrice);