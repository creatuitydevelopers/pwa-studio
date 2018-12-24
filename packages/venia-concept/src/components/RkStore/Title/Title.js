import React from 'react';
import classify from 'src/classify';
import defaultClasses from './title.css';
import { shape, string, object } from 'prop-types';

const Title = ({ classes, store, style = {}, tag = `h3`}) => {
    const { city, state } = store;

    const title = React.createElement(
        tag,
        { className: classes.root, style: style },
        city,
        ", ",
        state
    );

    return title;
}

Title.propTypes = {
    store: shape({
        city: string,
        state: string,
        style: object
    }),
    classes: shape({
        root: string
    })
}

export default classify(defaultClasses)(Title);
