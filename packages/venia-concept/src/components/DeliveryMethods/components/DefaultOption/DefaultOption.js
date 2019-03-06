import React from 'react';
import { shape, string } from 'prop-types';
import classify from 'src/classify';
import { getDefaultMethodCode } from 'src/models/DeliveryMethods';
import defaultClasses from './defualtOption.css';

const DefaultOption = ({ isChecked, methodInfo, onChange, classes }) => {
    const code = getDefaultMethodCode();
    const inputId = `delivery_method-${code}`;

    const qty = !!methodInfo.stores[0] ? methodInfo.stores[0].inventory_level : 0;
    const ship_time_options = !!methodInfo.delivery_options[0]
                                && methodInfo.delivery_options[0].name == 'ship_time_options'
                                ? methodInfo.delivery_options[0].value
                                : '';

    return (
        <React.Fragment>
            <label className={classes.label} htmlFor={inputId}>
                <input
                    id={inputId}
                    type="radio"
                    name="delivery_method"
                    className={classes.radioInput}
                    value={code}
                    checked={isChecked}
                    onChange={() => onChange(code, null)}
                />
                <span className={classes.title}>
                    {!!methodInfo.free_ship && (
                        <span className={classes.badge}>Free Shipping</span>
                    )}
                    Ship to Home
                </span>
            </label>
            <div className={classes.details}>
                {!!ship_time_options && (<p>{ship_time_options}</p>)}
                {qty <= 5 && qty > 0 && (<p className={classes.alertMessage}>{`Only ${qty} Left Online`}</p>)}
            </div>
        </React.Fragment>
    );
};

DefaultOption.propTypes = {
    classes: shape({
        root: string,
        label: string,
        radioInput: string,
        badge: string,
        title: string,
        details: string,
        alertMessage: string
    })
};

DefaultOption.defaultProps = {
    isChecked: false
};

export default classify(defaultClasses)(DefaultOption);
