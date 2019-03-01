import React from 'react';
import { array, shape, string } from 'prop-types';
import classify from 'src/classify';

import defaultClasses from './moreInformation.css';

const MoreInformation = ({classes, attributes}) => {
    return (
        <dl className={classes.root}>
            {attributes.map((item, key) => {
                return (
                    <React.Fragment key={key}>
                        <dt>{item.name}:</dt>
                        <dd>{item.value}</dd>
                    </React.Fragment>
                )
            })}
        </dl>
    )
};

MoreInformation.propTypes = {
    classes: shape({
        root: string,
    }),
    attributes: array
};

export default classify(defaultClasses)(MoreInformation);