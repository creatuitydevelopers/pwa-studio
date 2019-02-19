import React from 'react';
import { shape, string } from 'prop-types';
import classify from 'src/classify';
import { getDefaultMethodCode } from 'src/models/DeliveryMethods';
import defaultClasses from './defualtOption.css';

const DefaultOption = ({ isChecked, methodInfo, onChange, classes }) => {
    const code = getDefaultMethodCode();
    const inputId = `delivery_method-${code}`;

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
                {!!methodInfo.ship_time_options && (
                    <p>{methodInfo.ship_time_options}</p>
                )}
                {methodInfo.qty <= 5 && methodInfo.qty > 0 && (
                    <p className={classes.alertMessage}>{`Only ${
                        methodInfo.qty
                    } Left Online`}</p>
                )}
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
