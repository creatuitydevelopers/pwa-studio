import React from 'react';
import classify from 'src/classify';
import { oneOf, object, shape, string } from 'prop-types';
import Info from 'react-feather/dist/icons/info';
import Icon from 'src/components/Icon';
import { Price } from 'src/components/Price';
import { MetaData } from "src/components/RkStore/PriceWrapper";

import defaultClasses from './msrpPrice.css'

const MsrpPrice = ({priceData, priceConfig, viewMode, classes}) => {
    console.log(priceData, priceConfig, viewMode);
    return (
        <div className={classes.root}>
            {viewMode ==  'product_page' && <div className={classes.msrpPrice}><Price value={priceData.msrp_price} {...priceConfig}/></div>}
            <label className={classes.label}>{`See in cart.`} <Icon src={Info}/></label>
            <div className={classes.modal}>
                <p>Our price is lower than the manufacturer's "minimum advertised price." As a result, we cannot show you the price in catalog or the product page.</p>
                <p>You have no obligation to purchase the product once you know the price. You can simply remove the item from your cart.</p>
            </div>
            {viewMode == 'product_page' && <MetaData price={priceData.msrp_price} currencyCode={priceConfig.currencyCode}/>}
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
        label: string,
        modal: string,
        msrpPrice: string
    }),
    viewMode: oneOf(['product_page', 'category_page'])
};


export default classify(defaultClasses)(MsrpPrice);