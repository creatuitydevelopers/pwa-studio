import React from 'react';
import {shape, string} from 'prop-types';

import classify from 'src/classify';
import Icon from 'src/components/Icon';
import {Title} from "src/components/RkStore";

import defaultClasses from './storeWidgetHeaderLabel.css';

const StoreWidgetHeaderLabel = ({classes, currentStore}) => {
    return (
        <React.Fragment>
            <Icon name="map-pin" className={classes.icon}/>
            <div className={classes.label}>
                {!!currentStore
                    ? <Title store={currentStore}/>
                    : <span>Choose Store</span>
                }
            </div>
        </React.Fragment>
    )
};

StoreWidgetHeaderLabel.propTypes = {
    classes: shape({
        icon: string,
        label: string
    })
};

export default classify(defaultClasses)(StoreWidgetHeaderLabel);