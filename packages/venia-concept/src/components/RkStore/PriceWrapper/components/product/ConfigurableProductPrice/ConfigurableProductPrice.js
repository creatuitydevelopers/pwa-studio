import React from 'react';

import {ProductPrice, RangePrice} from "src/components/RkStore/PriceWrapper";

const ConfigurableProductPrice = (props) => {
    const {priceData} = props;

    return (
        <ProductPrice type={`configurable`} {...props}>
            {!!priceData.min_price && !!priceData.max_price && <RangePrice {...props}/>}
        </ProductPrice>
    );
}

export default ConfigurableProductPrice;