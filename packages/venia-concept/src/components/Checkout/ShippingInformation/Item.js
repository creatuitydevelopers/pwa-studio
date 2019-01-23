import React from 'react';
import { object } from 'prop-types';
import classify from 'src/classify';
import defaultClasses from './item.css';

const Item = (props) => {
    const { item, classes} = props;

    return (
        <div className={classes.root}>
            <p className={classes.name}>{item.name}</p>
        </div>
    )
}

Item.propTypes = {
    item: object,
    classes: object
}

export default classify(defaultClasses)(Item);