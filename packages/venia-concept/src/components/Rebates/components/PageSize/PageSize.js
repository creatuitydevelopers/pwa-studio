import React from 'react';
import { shape, string, number, func, array } from 'prop-types';
import classify from 'src/classify';

import Select from 'src/components/Select';

import {
    DEFAULT_PAGE_SIZE,
    PAGE_SIZE_OPTIONS
} from 'src/components/Rebates/consts';
import defaultClasses from './pageSize.css';

const PageSize = ({ classes, defaultValue, options, handlePageSize }) => {
    return (
        <div className={classes.root}>
            <label
                htmlFor={'pageSize'}
                className={classes.label}
            >{`Show`}</label>
            <Select
                field="pageSize"
                items={options}
                initialValue={defaultValue}
                onValueChange={handlePageSize}
            />
        </div>
    );
};

PageSize.propTypes = {
    classes: shape({
        root: string,
        label: string
    }),
    handlePageSize: func.isRequired,
    defaultValue: number,
    options: array
};

PageSize.defaultProps = {
    defaultValue: DEFAULT_PAGE_SIZE,
    options: PAGE_SIZE_OPTIONS
};

export default classify(defaultClasses)(PageSize);
