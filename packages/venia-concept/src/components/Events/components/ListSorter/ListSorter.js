import React from 'react';
import { func, oneOf, shape, string } from 'prop-types';
import classify from 'src/classify';

import Select from 'src/components/Select';

import {
    SORT_DEFAULT,
    SORT_DROPDOWN_OPTIONS
} from 'src/components/Events/consts';
import defaultClasses from './listSorter.css';

const ListSorter = ({ classes, defaultValue, handleSortChange }) => {
    return (
        <div className={classes.root}>
            <label htmlFor={'sortEvents'}>{`Sort by`}</label>
            <Select
                field="sortEvents"
                items={SORT_DROPDOWN_OPTIONS}
                initialValue={defaultValue}
                onValueChange={handleSortChange}
            />
        </div>
    );
};

ListSorter.propTypes = {
    classes: shape({
        root: string
    }),
    handleSortChange: func.isRequired,
    defaultValue: oneOf(['date_start', 'name'])
};

ListSorter.defaultProps = {
    defaultValue: SORT_DEFAULT
};

export default classify(defaultClasses)(ListSorter);
