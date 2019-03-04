import React from 'react';
import { object, string } from 'prop-types';

import {SpecialPrice, RegularPrice, MsrpPrice} from "src/components/RkStore/PriceWrapper";
import {showZeroPrice, isPriceMoreThanZero} from "src/models/Pricing";

const ProductPrice = (props) => {
    const {children, type, priceData} = props;

    if (!showZeroPrice(type) && !isPriceMoreThanZero(priceData)) return null;

    if (!!priceData.msrp) return <MsrpPrice {...props} />;

    if (!!priceData.special_price) return <SpecialPrice {...props} />;

    if (!!children) return <React.Fragment>{children}</React.Fragment>;

    return (<RegularPrice {...props}/>);
}

ProductPrice.propTypes = {
    type: string,
    priceData: object
};

ProductPrice.defaultProps = {
    type: 'simple'
};

export default ProductPrice;