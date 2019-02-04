import React from 'react';

import {SpecialPrice, RegularPrice, MsrpPrice, TierPrices} from "src/components/RkStore/PriceWrapper";
import {showZeroPrice, isPriceMoreThanZero} from "src/models/Pricing";

const ProductPrice = (props) => {
    const {children, priceData} = props;

    if (!showZeroPrice(priceData.type_id) && !isPriceMoreThanZero(priceData)) return null;

    if (!!priceData.msrp) return <MsrpPrice {...props} />;

    if (!!priceData.special_price) return <SpecialPrice {...props} />;

    if (!!children) return <React.Fragment>{children}</React.Fragment>;

    return (<RegularPrice {...props}/>);
}

export default ProductPrice;