import React from 'react';
import {compose} from "redux";
import {oneOf, object, shape, string} from 'prop-types';

import {SimpleProductPrice, ConfigurableProductPrice, GiftCardProductPrice, BoundleProductPrice, TierPrices} from "src/components/RkStore/PriceWrapper";

const PriceWrapper = (props) => {
    const priceData = {
        "final_price": 3.29,
        // "special_price": 2.29,
        "min_price": 2.29,
        "max_price": 3.29,
        "show_range": true,
        "tier_prices": [
            // {
            //     price_qty: 5,
            //     price: 2.10
            // },
            // {
            //     price_qty: 10,
            //     price: 1.10
            // },
            // {
            //     price_qty: 15,
            //     price: 0.10
            // }
        ],
        "msrp": false,
        "msrp_ongesture": false,
        "msrp_price": 1.23,
        "type_id": "simple"
    };

    const {priceConfig, viewMode} = props;

    const optionsMap = {
        simple: SimpleProductPrice,
        configurable: ConfigurableProductPrice,
        giftcard: GiftCardProductPrice,
        boundle: BoundleProductPrice
    };

    const ProductOptionTagName = optionsMap[priceData.type_id];

    return (
        <div>
            <ProductOptionTagName priceData={priceData} {...props}/>
            {viewMode == 'product_page' && <TierPrices items={priceData.tier_prices} priceConfig={priceConfig}/>}
        </div>
    );
}

PriceWrapper.propsType = {
    priceConfig: shape({
        currencyCode: string,
        partsClasses: object,
        locale: string,
    }),
    priceData: object.isRequired,
    viewMode: oneOf(['product_page', 'category_page'])
};

PriceWrapper.defaultProps = {
    priceConfig: {
        currencyCode: 'USD',
        partsClasses: {
            currency: 'upIdx',
            fraction: 'upIdx',
            decimal: 'hidden'
        },
        locale: `en-US`
    },
    viewMode: 'product_page'
};

export default PriceWrapper;