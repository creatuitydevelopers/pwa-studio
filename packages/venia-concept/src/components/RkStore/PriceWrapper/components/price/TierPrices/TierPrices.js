import React from 'react';
import classify from 'src/classify';
import { array, object, shape, string } from 'prop-types';

import { Price } from 'src/components/Price';

import defaultClasses from './tierPrices.css';

const TierPrices = ({items, priceConfig, classes}) => {

    if(!items || !items.length) return null;

    return (
        <ul className={classes.root}>
            {items.map((item, key) =>
                <li key={key} className={classes.item}>
                    {`Buy ${item.price_qty} with `}
                        <Price value={item.price} {...priceConfig}/>{` discount each`}
                </li>
            )}
        </ul>
    );
};

TierPrices.propsType = {
    items: array,
    priceConfig: shape({
        currencyCode: string.isRequired,
        partsClasses: object,
        locale: string.isRequired,
    }),
    classes: shape({
        root: string,
        item: string
    })
};

export default classify(defaultClasses)(TierPrices);
