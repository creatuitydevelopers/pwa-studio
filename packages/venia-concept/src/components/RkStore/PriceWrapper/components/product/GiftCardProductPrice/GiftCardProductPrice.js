import React from 'react';

import {ProductPrice, FromPrice} from "src/components/RkStore/PriceWrapper";

const GiftCardProductPrice = (props) => {
    const {priceData} = props;

    return (
        <ProductPrice type={`giftcard`} {...props}>
            {!!priceData.show_range && <FromPrice {...props}/>}
        </ProductPrice>
    );
}

export default GiftCardProductPrice;