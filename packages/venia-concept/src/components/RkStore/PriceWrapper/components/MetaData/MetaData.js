import React from 'react';
import {oneOf, number, string} from 'prop-types';

const MetaData = ({price, currencyCode, availability}) => {
    return (
        <span itemProp="offers" itemScope={``} itemType="http://schema.org/Offer">
            <meta itemProp="price" content={price}/>
            <meta itemProp="priceCurrency" content={currencyCode}/>
            <meta itemProp="availability" content={availability}/>
        </span>
    );
}

MetaData.propsType = {
    price: number.isRequired,
    currencyCode:string.isRequired,
    availability: oneOf(['InStock', 'OutOfStock'])
};

MetaData.defaultProps = {
    availability: 'InStock'
};

export default MetaData;