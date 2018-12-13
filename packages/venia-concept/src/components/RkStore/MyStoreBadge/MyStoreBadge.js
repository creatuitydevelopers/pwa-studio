import React from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import classify from 'src/classify';
import { string, shape, oneOf } from 'prop-types';
import defaultClasses from './myStoreBadge.css';

const defaultSize = null;

const MyStoreBadge = ({ classes, size, style }) => {
    const classNames = size ? [classes.root, classes[size]].join(' ') : classes.root;

    return (
        <div className={classNames} style={style}>
            <span className={classes.content}><IoIosCheckmarkCircleOutline /> My Store</span>
        </div>
    )
}


MyStoreBadge.propTypes = {
    classes: shape({
        root: string,
        size: string
    }),
    size: oneOf(['small', 'big']),
}

MyStoreBadge.defaultProps = {
    size: defaultSize
}

export default classify(defaultClasses)(MyStoreBadge)
