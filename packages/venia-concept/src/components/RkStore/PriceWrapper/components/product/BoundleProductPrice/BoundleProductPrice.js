import React from 'react';

import {ProductPrice, FromPrice} from "src/components/RkStore/PriceWrapper";

const BoundleProductPrice = (props) => {
    const {priceData} = props;

    return (
        <ProductPrice {...props}>
            {!!priceData.show_range && <FromPrice {...props}/>}
        </ProductPrice>
    );
}

export default BoundleProductPrice;