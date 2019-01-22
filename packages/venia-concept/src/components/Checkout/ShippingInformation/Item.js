import React from 'react';
import classify from 'src/classify';
import defaultClasses from './item.css';
import { Price } from 'src/components/Price';

const Item = (props) => {
    const { item, currencyCode, classes} = props;

    return (
        <div className={classes.root}>
            <p className={classes.name}>{item.name}</p>
        </div>
    )
}

export default classify(defaultClasses)(Item);