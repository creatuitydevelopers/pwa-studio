import React from 'react';
import classify from 'src/classify';
import defaultClasses from './grid.css';
import { shape, string } from 'prop-types';

const Grid = ({ classes, title, children }) => {

    return (
        <div>
            {title}
            {!children.length && <div className={classes.noResults}>No results found!</div>}
            <div className={classes.root}>
                {children}
            </div>
        </div>
    );
};

Grid.propTypes = {
    classes: shape({
        root: string,
        noResults: string
    })
};

export default classify(defaultClasses)(Grid);
