import React from "react";
import {shape, string} from "prop-types";
import classify from 'src/classify';

import defaultClasses from './placeholderOption.css';

const PlaceholderOption = ({classes}) => {
    return(<li className={classes.root}></li>)
}

PlaceholderOption.propTypes = {
    classes: shape({
        root: string
    }),
};

export default classify(defaultClasses)(PlaceholderOption);

