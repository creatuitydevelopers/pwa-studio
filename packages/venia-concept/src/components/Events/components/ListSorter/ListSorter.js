import React from "react";
import {func, oneOf, shape, string} from "prop-types";
import classify from 'src/classify';

import Select from 'src/components/Select';

import { SORT_DEFAULT, SORT_DROPDOWN_OPTIONS } from './consts';
import defaultClasses from './listSorter.css';


const ListSorter = ({classes, defaultValue, handleSortChange}) => {
    return (
        <div className={classes.root}>
            {`Sort by`}
            {/*<Select*/}
                {/*items={SORT_DROPDOWN_OPTIONS}*/}
                {/*initialValue={SORT_DEFAULT}*/}
                {/*onChange={(event) => handleSortChange(event.target.value)}*/}
            {/*/>*/}
        </div>
    );
};

ListSorter.propTypes = {
    classes: shape({
        root: string
    }),
    handleSortChange: func.isRequired,
    defaultValue: oneOf(['date', 'event']),
};

ListSorter.defaultProps = {
    defaultValue: SORT_DEFAULT
};

export default classify(defaultClasses)(ListSorter);