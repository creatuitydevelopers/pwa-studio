import React from 'react';
import classify from 'src/classify';
import defaultClasses from './grid.css';
import { shape, string } from 'prop-types';

const Grid = ({ classes, title, children }) => {

    return (<div>{title}<div className={classes.root}>{children}</div></div>);
};

Grid.propTypes = {
    classes: shape({
        root: string
    })
};

export default classify(defaultClasses)(Grid);
