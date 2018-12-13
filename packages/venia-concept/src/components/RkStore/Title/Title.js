import React from 'react';
import classify from 'src/classify';
import defaultClasses from './title.css';
import { shape, string } from 'prop-types';

const Title = ({ classes, store, ...restProps}) => {
    const { city, state } = store;
    return (
        <h3 className={classes.root} {...restProps}>{city}, {state}</h3>
    );
}

Title.propTypes = {
    store: shape({
        city: string,
        state: string
    }),
    classes: shape({
        root: string
    })
}

export default classify(defaultClasses)(Title);
